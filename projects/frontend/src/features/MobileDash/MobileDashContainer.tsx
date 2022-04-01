import React, { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { useCompoundQueryQuery } from '../../../generated/graphql';
import { useSortState } from '../../components/ResultsTable/state/sort.state';
import useCacheStitchedIdFetch from '../../components/ResultsTable/useCacheStitchedIdFetch';
import { RESULTS_PLAYLIST_ID } from '../../hooks/state/useGlobalPlaylistState/songLists.state';
import { usePlaylistState } from '../../hooks/state/usePlaylistState';
import { useSearchbarState } from '../../hooks/state/useSearchbarState';
import { useYoutubePlayerState } from '../../hooks/state/useYoutubePlayerState';
import useEnsureValue from '../../hooks/useEnsureValue';
import { compoundQuery } from '../../stories/queries/compoundQuery';
import { compactTrackFromTrackId } from '../../types/compactTrack/util';
import MobileDashBody from './MobileDashBody';

const objCompare = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

const MobileDashContainer = () => {
  const { setSearchbarState, searchbarState, resetSearchbar } =
    useSearchbarState();

  // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const [options, setOptions] = useState(compoundQuery.compoundQuery.counts);
  // const { sortInput, resetSort } = useSortState();
  const { addTracks, replaceTracks } = usePlaylistState(RESULTS_PLAYLIST_ID);
  const [debouncedSearch] = useDebounce(searchbarState, 300, {
    equalityFn: objCompare,
  });
  // const [debouncedSort] = useDebounce(sortInput, 300, {
  //   equalityFn: objCompare,
  // });
  const [page, setPage] = useState(0);
  const firstQuery = useRef(true);
  const { setTrack } = useYoutubePlayerState();

  const pageSize = 20;
  const pagination = { offset: pageSize * page, limit: pageSize };

  const { data, error, loading } = useCompoundQueryQuery({
    variables: {
      criteria: {
        ...debouncedSearch,
        // sort: debouncedSort,
        pagination,
      },
    },
    onCompleted: (res) => {
      console.log({ res });
      if (firstQuery.current && res.compoundQuery.randomId) {
        // randomize pre-loaded link
        const compact = compactTrackFromTrackId(res.compoundQuery.randomId);
        firstQuery.current = false;
        setTrack(compact);
      }
      if (page === 0) {
        replaceTracks(res.compoundQuery.ids);
      } else {
        addTracks(res.compoundQuery.ids);
      }
      setOptions(res.compoundQuery.counts);
    },
  });
  const ensuredTotalPages = useEnsureValue(data?.compoundQuery.totalPages, 0);
  const ensuredTotalResults = useEnsureValue(
    data?.compoundQuery.totalResults,
    0,
  );
  const trackIds = useEnsureValue(data?.compoundQuery.ids, []);

  const [tracks] = useCacheStitchedIdFetch(
    trackIds.map(compactTrackFromTrackId),
  );

  const resetPageAndSort = () => {
    setPage(0);
    // resetSort();
  };
  useEffect(resetPageAndSort, [debouncedSearch]);
  // useEffect(() => {
  //   setPage(0);
  // }, [debouncedSort]);

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
    <MobileDashBody
      compoundQuery={data || compoundQuery}
      initSearchState={searchbarState}
      setSearch={setSearchbarState}
      resetSearch={resetSearchbar}
      playlistTracks={[]}
      resultsTracks={tracks || []}
    />
  );
};

export default MobileDashContainer;
