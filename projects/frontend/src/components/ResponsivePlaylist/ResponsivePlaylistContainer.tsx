import React from 'react';
import { useParams } from 'react-router';

import { useRoutedPlaylist } from '../../hooks/state/useRoutedPlaylist';
import {
  compactTrackFromString,
  playlistTrackFromTrack,
} from '../../types/compactTrack/util';
import useCacheStitchedIdFetch from '../ResultsTable/useCacheStitchedIdFetch';
import ResponsivePlaylistBody from './ResponsivePlaylistBody';

const ResponsivePlaylistContainer = () => {
  const {tracks: routedTracks, replaceTracks} = useRoutedPlaylist();
  const [tracks] = useCacheStitchedIdFetch(
    routedTracks.map(compactTrackFromString),
  );

  const clearPlaylist = () => {
    replaceTracks([])
  }

  return (
    <ResponsivePlaylistBody
      tracks={tracks?.map(playlistTrackFromTrack) ?? []}
      clearPlaylist={clearPlaylist}
    />
  );
};

export default ResponsivePlaylistContainer;