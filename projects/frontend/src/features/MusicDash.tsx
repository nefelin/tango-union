import { useReactiveVar } from '@apollo/client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDebounce } from 'use-debounce';

import {
  FullCountFragmentFragment,
  useCompoundQueryQuery,
} from '../../generated/graphql';
import { Footer, FooterFooter, FooterHeader } from '../components/Footer';
import NowPlaying from '../components/NowPlaying';
import ResultsTable from '../components/ResultsTable';
import { useSortState } from '../components/ResultsTable/state/sort.state';
import Searchbar from '../components/Searchbar';
import reactiveSearchbarState from '../components/Searchbar/searchbar.state';
import TopBar from '../components/TopBar';

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

  document.body.style.margin = '';

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
    <>
      <TopBar />
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
      <Footer>
        <FooterHeader>
          Made with{' '}
          <span aria-label="heart emoji" role="img">
            ❤️
          </span>
        </FooterHeader>
        <FooterFooter className="nameplate">by Eric Lindgren</FooterFooter>
      </Footer>
    </>
  );
};

const MusicDashContainer = styled.div`
  height: 83vh;
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
