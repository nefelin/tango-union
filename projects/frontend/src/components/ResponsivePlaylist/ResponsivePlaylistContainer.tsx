import React, { useEffect } from 'react';

import { QUICKLIST_PLAYLIST_ID } from '../../hooks/state/useGlobalPlaylistState/songLists.state';
import { usePlaylistState } from '../../hooks/state/usePlaylistState';
import { useRoutedPlaylist } from '../../hooks/state/useRoutedPlaylist';
import {
  compactTrackFromString,
  playlistTrackFromTrack,
} from '../../types/compactTrack/util';
import useCacheStitchedIdFetch from '../ResultsTable/useCacheStitchedIdFetch';
import ResponsivePlaylistBody from './ResponsivePlaylistBody';

const ResponsivePlaylistContainer = () => {
  const {
    playlist: { tracks: playlistTracks },
    loadTracks,
  } = usePlaylistState(QUICKLIST_PLAYLIST_ID);
  const { tracks: routedTracks } = useRoutedPlaylist();
  const [tracks] = useCacheStitchedIdFetch(playlistTracks);

  useEffect(() => {
    loadTracks(routedTracks.map(compactTrackFromString));
  }, []);

  return (
    <ResponsivePlaylistBody
      tracks={tracks?.map(playlistTrackFromTrack) ?? []}
    />
  );
};

export default ResponsivePlaylistContainer;
