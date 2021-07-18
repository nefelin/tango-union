import { useEffect } from 'react';

import { usePlaylistsState } from './usePlaylistsState';
import { useRoutedState } from './useRoutedState';

interface Props {
  tracks: Array<string>;
  addTrack: (id: string) => void;
  removeTrack: (id: string) => void;
  replaceTracks: (ids: Array<string>) => void;
  // moveTrack: (id: number, newIndex: number) => void;
}

export const useRoutedPlaylist = (): Props => {
  const { tracks, setTracks } = useRoutedState();
  const { tracks: stateTracks } = usePlaylistsState('quicklist');

  console.log('routehook')
  useEffect(() => {
    replaceTracks(stateTracks.map(x => x[0])) // pull song ids from idtuples
  }, [stateTracks])

  const addTrack = (newId: string) => {
    setTracks([...tracks, newId]);
  };

  const removeTrack = (id: string) => {
    const newList = tracks.filter((listId) => listId !== id);
    setTracks(newList);
  };

  const replaceTracks = (ids: Array<string>) => {
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
