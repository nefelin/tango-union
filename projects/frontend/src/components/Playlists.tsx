import React, { useContext, useEffect } from 'react';

import { PlaylistConfigContext } from '../context/playlistConfig.context';
import { usePlaylistState } from '../hooks/state/usePlaylistState';
import { useRoutedPlaylist } from '../hooks/state/useRoutedPlaylist';
import { compactTrackFromString } from '../types/CompactTrack';
import PlaylistBody from './Playlist/PlaylistBody';
import useCacheStitchedIdFetch from './ResultsTable/useCacheStitchedIdFetch';

const Playlists = () => {
  const { name: playlistId } = useContext(PlaylistConfigContext);
  const {
    playlist: { tracks: playlistTracks },
    loadTracks,
  } = usePlaylistState(playlistId);
  const { tracks: routedTracks } = useRoutedPlaylist();
  const [tracks] = useCacheStitchedIdFetch(playlistTracks);

  useEffect(() => {
    loadTracks(routedTracks.map(compactTrackFromString));
  }, []);

  return <PlaylistBody tracks={tracks} />;
};

export default Playlists;
