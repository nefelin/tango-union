import React from 'react';

import { QUICKLIST_PLAYLIST_ID, RESULTS_PLAYLIST_ID } from '../../hooks/state/useGlobalPlaylistState/songLists.state';
import { usePaginationState } from '../../hooks/state/usePaginationState';
import { usePlaylistState } from '../../hooks/state/usePlaylistState';
import useCacheStitchedIdFetch from '../ResultsTable/useCacheStitchedIdFetch';
import ResponsiveResultListBody from './ResponsiveResultListBody';

const ResponsiveResultList = () => {
  const { playlist: resultsList } = usePlaylistState(RESULTS_PLAYLIST_ID);
  const {addTracks: addPlaylistTrack} = usePlaylistState(QUICKLIST_PLAYLIST_ID);
  const { totalResults, totalPages, page, setPage, loading} =
    usePaginationState();

  const [hydratedTracks] = useCacheStitchedIdFetch(resultsList.tracks);

  const handleIncrement = () => {
    if (!loading && resultsList.tracks.length < totalResults) {
      setPage(page + 1);
    }
  };

  return (
    <ResponsiveResultListBody
      onScrollEnd={handleIncrement}
      addPlaylistTrack={addPlaylistTrack}
      loading={loading}
      tracks={hydratedTracks}
      trackTotal={totalResults}
      pageTotal={totalPages}
      page={page + 1}
    />
  );
};

export default ResponsiveResultList;
