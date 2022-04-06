import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useDebounce } from 'use-debounce';

import {
  SelectIndexCount,
  useCompoundQueryQuery,
} from '../../../generated/graphql';
import { useSortState } from '../../components/ResultsTable/state/sort.state';
import { RESULTS_PLAYLIST_ID } from '../../hooks/state/useGlobalPlaylistState/songLists.state';
import { generateListIdZeroRepeats } from '../../hooks/state/useGlobalPlaylistState/util';
import { usePaginationState } from '../../hooks/state/usePaginationState';
import { usePlaylistState } from '../../hooks/state/usePlaylistState';
import { useSearchbarState } from '../../hooks/state/useSearchbarState';
import { useYoutubePlayerState } from '../../hooks/state/useYoutubePlayerState';
import useDynamicPageTitle from '../../hooks/useDynamicPageTitle';
import useEnsureValue from '../../hooks/useEnsureValue';
import useNavigateWithParamState from '../../hooks/useNavigateWithParamState';
import { compactTrackFromTrackId } from '../../types/compactTrack/util';
import { useIsMobile } from '../../util/isMobile';
import MobileDashBody from './MobileDashBody';

const objCompare = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);
const emptyCounts: SelectIndexCount = {
  year: [],
  singer: [],
  orchestra: [],
  genre: [],
};

const MobileDashContainer = () => {
  useDynamicPageTitle();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const { setSearchbarState, searchbarState, resetSearchbar } =
    useSearchbarState();

  const { sortInput, resetSort } = useSortState();
  const { addTracks, replaceTracks } = usePlaylistState(RESULTS_PLAYLIST_ID);
  const [debouncedSearch] = useDebounce(searchbarState, 300, {
    equalityFn: objCompare,
  });
  const [debouncedSort] = useDebounce(sortInput, 300, {
    equalityFn: objCompare,
  });
  const { page, setResults, setPage, setLoading, pageSize, offset } =
    usePaginationState();
  const firstQuery = useRef(true);
  const { setTrack } = useYoutubePlayerState();

  const pagination = { offset, limit: pageSize };

  const { data, error, loading } = useCompoundQueryQuery({
    variables: {
      criteria: {
        ...debouncedSearch,
        sort: debouncedSort,
        pagination,
      },
    },
    onCompleted: (res) => {
      setResults(res.compoundQuery.totalResults);
      if (firstQuery.current && res.compoundQuery.randomId) {
        const compact = compactTrackFromTrackId(generateListIdZeroRepeats)(
          res.compoundQuery.ids[0] || '1',
        );
        firstQuery.current = false;
        setTrack(compact);
      }
      if (page === 0) {
        replaceTracks(res.compoundQuery.ids, generateListIdZeroRepeats);
      } else {
        addTracks(res.compoundQuery.ids, generateListIdZeroRepeats);
      }
    },
  });

  const ensuredCounts = useEnsureValue(data?.compoundQuery.counts, emptyCounts);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const paramNavigate = useNavigateWithParamState();
  useEffect(() => {
    if (!isMobile) {
      paramNavigate('/desktop');
    }
  }, [isMobile]);

  const resetPageAndSort = () => {
    setPage(0);
    resetSort();
  };
  useEffect(resetPageAndSort, [debouncedSearch]);
  useEffect(() => {
    setPage(0);
  }, [debouncedSort]);

  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  return (
    <MobileDashBody
      counts={ensuredCounts}
      initSearchState={searchbarState}
      setSearch={setSearchbarState}
      resetSearch={resetSearchbar}
      playlistTracks={[]}
    />
  );
};

export default MobileDashContainer;
