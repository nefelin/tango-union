import { useRoutedState } from './useRoutedState';

interface Props {
  tracks: Array<string>;
  addTrack: (id: string) => void;
  removeTrack: (id: string) => void;
  replaceTracks: (ids: Array<string>) => void;
  // moveTrack: (id: number, newIndex: number) => void;
}

export const usePlaylistState = (): Props => {
  const { tracks, setTracks } = useRoutedState();

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
