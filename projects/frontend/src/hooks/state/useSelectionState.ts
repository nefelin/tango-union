import { makeVar, useReactiveVar } from '@apollo/client';

import { LocalSongId } from './usePlaylistsState/types';

const reactiveSelectedTracks = makeVar<Array<LocalSongId>>([]);

export const useSelectionState = () => {
  // fixme handle copying
  const selected = useReactiveVar(reactiveSelectedTracks);

  const addSelected = (id: LocalSongId) => {
    reactiveSelectedTracks([...reactiveSelectedTracks(), id]);
  };

  const removeSelected = (id: LocalSongId) => {
    reactiveSelectedTracks(
      reactiveSelectedTracks().filter((listId) => id !== listId),
    );
  };

  // late night bad decision, sort of overloading this function to work in two contexts....
  const isSelected = (id: LocalSongId) => selected.includes(id);

  const replaceSelected = (id: LocalSongId) => reactiveSelectedTracks([id]);

  return {
    selected,
    isSelected,
    replaceSelected,
    addSelected,
    removeSelected,
  };
};
