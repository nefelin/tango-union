import * as React from 'react';

import { useRoutedTrackList } from '../hooks/useRoutedTracklist';
import PlaylistBody from './Playlist/PlaylistBody';
import useCacheStitchedIdFetch from './ResultsTable/useCacheStitchedIdFetch';

const Playlists = () => {
  const { tracks: ids } = useRoutedTrackList();
  const [tracks] = useCacheStitchedIdFetch(ids, false);
  return <PlaylistBody tracks={tracks} />;
};

export default Playlists;
