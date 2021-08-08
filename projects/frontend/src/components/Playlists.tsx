import * as React from 'react';
import { useContext, useEffect } from 'react';

import { PlaylistConfigContext } from '../context/playlistConfig.context';
import { usePlaylistState } from '../hooks/state/usePlaylistState';
import { useRoutedPlaylist } from '../hooks/state/useRoutedPlaylist';
import PlaylistBody from './Playlist/PlaylistBody';
import useCacheStitchedIdFetch from './ResultsTable/useCacheStitchedIdFetch';

const Playlists = () => {
  const { name: playlistId } = useContext(PlaylistConfigContext)
  const { tracks: ids, replaceTracks } = usePlaylistState(playlistId);
  const { tracks: routedTracks } = useRoutedPlaylist();
  const [tracks] = useCacheStitchedIdFetch(ids);

  useEffect(() => {
    replaceTracks(routedTracks);
  }, []);

  return <PlaylistBody tracks={tracks}/>;
};

export default Playlists;
