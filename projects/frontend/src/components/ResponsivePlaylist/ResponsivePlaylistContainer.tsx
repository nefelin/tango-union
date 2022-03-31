import React from 'react';
import { useParams } from 'react-router';

import {
  compactTrackFromString,
  playlistTrackFromTrack,
} from '../../types/compactTrack/util';
import useCacheStitchedIdFetch from '../ResultsTable/useCacheStitchedIdFetch';
import ResponsivePlaylistBody from './ResponsivePlaylistBody';

const ResponsivePlaylistContainer = () => {
  const { saved } = useParams<{ saved?: string }>();
  const { tracks: routedTracks } = JSON.parse(saved || '{"tracks": []}');
  const [tracks] = useCacheStitchedIdFetch(
    routedTracks.map(compactTrackFromString),
  );

  return (
    <ResponsivePlaylistBody
      tracks={tracks?.map(playlistTrackFromTrack) ?? []}
    />
  );
};

export default ResponsivePlaylistContainer;