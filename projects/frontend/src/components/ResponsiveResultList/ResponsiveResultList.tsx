import React from 'react';

import { RESULTS_PLAYLIST_ID } from '../../hooks/state/useGlobalPlaylistState/songLists.state';
import { usePaginationState } from '../../hooks/state/usePaginationState';
import { usePlaylistState } from '../../hooks/state/usePlaylistState';
import useCacheStitchedIdFetch from '../ResultsTable/useCacheStitchedIdFetch';
import ResponsiveResultListBody from './ResponsiveResultListBody';

const ResponsiveResultList = () => {
  const { playlist } = usePlaylistState(RESULTS_PLAYLIST_ID);
  const { totalResults, totalPages, page, setPage, loading, setLoading } =
    usePaginationState();

  const [hydratedTracks] = useCacheStitchedIdFetch(playlist.tracks);

  const handleIncrement = () => {
    if (!loading && playlist.tracks.length < totalResults) {
      setLoading(true);
      setPage(page + 1);
    }
  };


  return (
    <ResponsiveResultListBody
      onScrollEnd={handleIncrement}
      loading={loading}
      tracks={hydratedTracks}
      trackTotal={totalResults}
      pageTotal={totalPages}
      page={page + 1}
    />
  );
};

export default ResponsiveResultList;
