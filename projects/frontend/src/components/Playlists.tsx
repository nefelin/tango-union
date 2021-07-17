import * as React from 'react';

import { usePlaylistsState } from '../hooks/state/usePlaylistsState';
import PlaylistBody from './Playlist/PlaylistBody';
import useCacheStitchedIdFetch from './ResultsTable/useCacheStitchedIdFetch';

const Playlists = () => {
  const { tracks: ids } = usePlaylistsState('quicklist');
  const [tracks] = useCacheStitchedIdFetch(ids);
  return <PlaylistBody tracks={tracks} />;
};

export default Playlists;
