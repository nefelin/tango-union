import * as React from 'react';
import { useEffect } from 'react';

import { usePlaylistState } from '../hooks/state/usePlaylistState';
import { useRoutedPlaylist } from '../hooks/state/useRoutedPlaylist';
import PlaylistBody from './Playlist/PlaylistBody';
import useCacheStitchedIdFetch from './ResultsTable/useCacheStitchedIdFetch';

const Playlists = () => {
  const { tracks: ids, replaceTracks } = usePlaylistState('quicklist');
  const { tracks: routedTracks } = useRoutedPlaylist();
  const [tracks] = useCacheStitchedIdFetch(ids);

  useEffect(() => {
    replaceTracks(routedTracks);
  }, []);

  return <PlaylistBody tracks={tracks} />;
};

export default Playlists;
