import { useReactiveVar } from '@apollo/client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDebounce } from 'use-debounce';

import {
  FullCountFragmentFragment,
  useCompoundQueryQuery,
} from '../../generated/graphql';
import NowPlaying from '../components/NowPlaying';
import ResultsTable from '../components/ResultsTable';
import Searchbar from '../components/Searchbar';
import reactiveSearchbarState from '../components/Searchbar/searchbar.state';
import { compoundSearchOptsFromSearchbarState } from '../components/Searchbar/util';

const emptyOptions: FullCountFragmentFragment['counts'] = {
  singer: [],
  orchestra: [],
  genre: [],
};

const MusicDash = () => {
  const [options, setOptions] = useState(emptyOptions);
  const searchState = useReactiveVar(reactiveSearchbarState);
  const [debouncedSearchState] = useDebounce(searchState, 300);
  const [page, setPage] = useState(0);

  const pageSize = 40;
  const pagination = { offset: 0, limit: pageSize * (page + 1) };

  const { data, error, loading } = useCompoundQueryQuery({
    variables: {
      criteria: {
        ...compoundSearchOptsFromSearchbarState(debouncedSearchState),
        pagination,
      },
    },
  });

  useEffect(() => {
    if (data?.compoundQuery.counts) {
      setOptions(data.compoundQuery.counts);
    }
  }, [data?.compoundQuery]);

  useEffect(() => {
    setPage(0);
  }, [debouncedSearchState]);

  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  const handlePageIncrement = () => {
    const resultCount = data?.compoundQuery?.totalResults;
    if (resultCount && pagination.limit < resultCount) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <MusicDashContainer>
      <Searchbar selectOptions={options} />
      <ActionRow>
        <ResultsTable
          ids={data?.compoundQuery.ids}
          loading={loading}
          incPage={handlePageIncrement}
          page={page}
        />
        <NowPlaying />
      </ActionRow>
    </MusicDashContainer>
  );
};

const MusicDashContainer = styled.div`
  height: 80vh;
  padding: 1vh;
  display: flex;
  flex-direction: column;
`;

const ActionRow = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export default MusicDash;
