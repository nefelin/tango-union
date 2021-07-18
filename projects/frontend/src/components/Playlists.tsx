import * as React from 'react';
import { useEffect } from 'react';

import { usePlaylistsState } from '../hooks/state/usePlaylistsState';
import { useRoutedPlaylist } from '../hooks/state/useRoutedPlaylist';
import PlaylistBody from './Playlist/PlaylistBody';
import useCacheStitchedIdFetch from './ResultsTable/useCacheStitchedIdFetch';

const Playlists = () => {
  const { tracks: ids, replaceTracks } = usePlaylistsState('quicklist');
  const { tracks: routedTracks } = useRoutedPlaylist();
  const [tracks] = useCacheStitchedIdFetch(ids);

  useEffect(() => {
    replaceTracks(routedTracks);
  }, []);

  return <PlaylistBody tracks={tracks} />;
};

export default Playlists;
