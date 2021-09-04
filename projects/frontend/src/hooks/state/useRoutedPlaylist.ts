import { useEffect } from 'react';

import { CompactTrack, CompoundIdString, compoundIdStringFromCompactTrack } from '../../types/CompactTrack';
import { usePlaylistState } from './usePlaylistState';
import { useRoutedState } from './useRoutedState';

export const useRoutedPlaylist = () => {
  const { tracks, setTracks } = useRoutedState();
  const { tracks: stateTracks } = usePlaylistState('quicklist');

  useEffect(() => {
    setTracks(stateTracks.map(compoundIdStringFromCompactTrack)) // pull song ids from idtuples
  }, [stateTracks])

  const addTrack = (track: CompactTrack) => {
    setTracks([...tracks, compoundIdStringFromCompactTrack(track)]);
  };

  const removeTrack = (id: string) => {
    const newList = tracks.filter((listId) => listId !== id);
    setTracks(newList);
  };

  const replaceTracks = (ids: Array<CompoundIdString>) => {
    setTracks(ids);
  };

  return {
    addTrack,
    tracks,
    removeTrack,
    // removeIndex <-- FixME
    replaceTracks,
  };
};
