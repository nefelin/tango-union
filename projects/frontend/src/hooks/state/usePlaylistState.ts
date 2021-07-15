import { useRoutedState } from './useRoutedState';

interface Props {
  tracks: Array<number>;
  addTrack: (id: number) => void;
  removeTrack: (id: number) => void;
  replaceTracks: (ids: Array<number>) => void;
  // moveTrack: (id: number, newIndex: number) => void;
}

export const usePlaylistState = (): Props => {
  const { tracks: stringTracks, setTracks } = useRoutedState();

  const tracks: Array<number> =
    stringTracks
      .map((num) => parseInt(num, 10))
      .filter((x) => !Number.isNaN(x)) ?? [];

  const addTrack = (newId: number) => {
    const stringId = newId.toString();
    setTracks([...stringTracks, stringId]);
  };

  const removeTrack = (id: number) => {
    const newList = stringTracks.filter((listId) => listId !== id.toString());
    setTracks(newList);
  };

  const replaceTracks = (ids: Array<number>) => {
    setTracks(ids.map((id) => id.toString()));
  };

  return {
    addTrack,
    tracks,
    removeTrack,
    // removeIndex <-- FixME
    replaceTracks,
  };
};
