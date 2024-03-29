import React, { useEffect, useRef, useState } from 'react';
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
import { generateListIdZeroRepeats } from '../hooks/state/useGlobalPlaylistState/util';
import { usePlaylistState } from '../hooks/state/usePlaylistState';
import { useSearchbarState } from '../hooks/state/useSearchbarState';
import { useYoutubePlayerState } from '../hooks/state/useYoutubePlayerState';
import useDynamicPageTitle from '../hooks/useDynamicPageTitle';
import useEnsureValue from '../hooks/useEnsureValue';
import { FocusableContext } from '../hooks/useFocusable';
import useNavigateWithParamState from '../hooks/useNavigateWithParamState';
import { compactTrackFromTrackId } from '../types/compactTrack/util';
import { useIsMobile } from '../util/isMobile';

const emptyOptions: FullCountFragmentFragment['counts'] = {
  year: [],
  singer: [],
  orchestra: [],
  genre: [],
};
const objCompare = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

const MusicDash = () => {
  useDynamicPageTitle();
  const isMobile = useIsMobile();
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
  const firstQuery = useRef(true);
  const { setTrack } = useYoutubePlayerState();

  const pageSize = 20;
  const pagination = { offset: pageSize * page, limit: pageSize };

  const { data, error, loading } = useCompoundQueryQuery({
    variables: {
      criteria: {
        ...debouncedSearch,
        sort: debouncedSort,
        pagination,
      },
    },
    onCompleted: (res) => {
      if (firstQuery.current && res.compoundQuery.randomId) {
        // randomize pre-loaded link
        const compact = compactTrackFromTrackId(generateListIdZeroRepeats)(
          res.compoundQuery.randomId,
        );
        // const compact = compactTrackFromTrackId('9929');
        firstQuery.current = false;
        setTrack(compact);
      }
      if (page === 0) {
        replaceTracks(res.compoundQuery.ids, generateListIdZeroRepeats);
      } else {
        addTracks(res.compoundQuery.ids, generateListIdZeroRepeats);
      }
      setOptions(res.compoundQuery.counts);
    },
  });
  const ensuredTotalPages = useEnsureValue(data?.compoundQuery.totalPages, 0);
  const ensuredTotalResults = useEnsureValue(
    data?.compoundQuery.totalResults,
    0,
  );

  const resetPageAndSort = () => {
    setPage(0);
    resetSort();
  };
  useEffect(resetPageAndSort, [debouncedSearch]);
  useEffect(() => {
    setPage(0);
  }, [debouncedSort]);
  const paramNavigate = useNavigateWithParamState();
  useEffect(() => {
    if (isMobile) {
      paramNavigate('/mobile');
    }
  }, [isMobile]);

  document.body.style.margin = '';

  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  const handlePageIncrement = () => {
    const resultCount = data?.compoundQuery?.totalResults;
    if (resultCount && page + 1 < ensuredTotalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="overflow-hidden">
      <TopBar />
      <MusicDashContainer>
        <FocusableContext>
          <DragContext>
            <Searchbar selectOptions={options} />
            <ActionRow>
              <ResultsTable
                loading={loading}
                incPage={handlePageIncrement}
                page={page + 1}
                totalResults={ensuredTotalResults}
                totalPages={ensuredTotalPages}
              />
              <NowPlaying />
            </ActionRow>
          </DragContext>
        </FocusableContext>
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
    </div>
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
