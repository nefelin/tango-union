import * as React from 'react';

import PlaylistBody from './Playlist/PlaylistBody';
import { useRouterTrackList } from './ResultsTable/ResultsTableBody/cellRenderers/actionCell';
import useCacheStitchedIdFetch from './ResultsTable/useCacheStitchedIdFetch';

const Playlists = () => {
  const { tracks: ids } = useRouterTrackList('/player'); // fixme fallback passed by multiple consumers causes weird race condition
  const [tracks] = useCacheStitchedIdFetch(ids, false);
  return <PlaylistBody tracks={tracks} />;
};

export default Playlists;
