import * as React from 'react';

import { usePlaylistState } from '../hooks/state/usePlaylistState';
import PlaylistBody from './Playlist/PlaylistBody';
import useCacheStitchedIdFetch from './ResultsTable/useCacheStitchedIdFetch';

const Playlists = () => {
  const { tracks: ids } = usePlaylistState();
  const [tracks] = useCacheStitchedIdFetch(ids, false);
  return <PlaylistBody tracks={tracks} />;
};

export default Playlists;
