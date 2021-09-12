import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDebounce } from 'use-debounce';

import {
  FullCountFragmentFragment,
  useCompoundQueryQuery,
} from '../../generated/graphql';
import DragContext from '../components/DragContext';
import { Footer, FooterFooter, FooterHeader } from '../components/Footer';
import NowPlaying from '../components/NowPlaying';
import ResultsTable from '../components/ResultsTable';
import { useSortState } from '../components/ResultsTable/state/sort.state';
import Searchbar from '../components/Searchbar';
import TopBar from '../components/TopBar';
import { RESULTS_PLAYLIST_ID } from '../hooks/state/useGlobalPlaylistState/songLists.state';
import { usePlaylistState } from '../hooks/state/usePlaylistState';
import { useSearchbarState } from '../hooks/state/useSearchbarState';

const emptyOptions: FullCountFragmentFragment['counts'] = {
  year: [],
  singer: [],
  orchestra: [],
  genre: [],
};
const objCompare = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

const MusicDash = () => {
  const [options, setOptions] = useState(emptyOptions);
  const { searchbarState } = useSearchbarState();
  const { sortInput, resetSort } = useSortState();
  const { addTracks, replaceTracks } = usePlaylistState(RESULTS_PLAYLIST_ID);
  const [debouncedSearch] = useDebounce(searchbarState, 300, {
    equalityFn: objCompare,
  });
  const [debouncedSort] = useDebounce(sortInput, 300, {
    equalityFn: objCompare,
  });
  const [page, setPage] = useState(0);

  const pageSize = 40;
  const pagination = { offset: 0, limit: pageSize * (page + 1) };

  const { data, error, loading } = useCompoundQueryQuery({
    variables: {
      criteria: {
        ...debouncedSearch,
        sort: debouncedSort,
        pagination,
      },
    },
  });

  document.body.style.margin = '';

  useEffect(() => {
    if (data?.compoundQuery) {
      setOptions(data.compoundQuery.counts);
      replaceTracks(data?.compoundQuery.ids ?? []);
    }
  }, [data?.compoundQuery]);

  const resetPageAndSort = () => {
    setPage(0);
    resetSort();
  };
  useEffect(resetPageAndSort, [debouncedSearch]);

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
        <DragContext>
          <Searchbar selectOptions={options} />
          <ActionRow>
            <ResultsTable
              loading={loading}
              incPage={handlePageIncrement}
              page={page}
            />
            <NowPlaying />
          </ActionRow>
        </DragContext>
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
