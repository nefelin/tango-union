import { makeVar, useReactiveVar } from '@apollo/client';

import { LocalSongId } from './usePlaylistsState/types';

export const reactiveSelectedTracks = makeVar<Array<LocalSongId>>([]);

export const useSelectionState = () => {
  // fixme handle copying
  const selected = useReactiveVar(reactiveSelectedTracks);

  const addSelected = (id: LocalSongId) => {
    reactiveSelectedTracks([...reactiveSelectedTracks(), id]);
  };

  const removeSelected = (...ids: Array<LocalSongId>) => {
    reactiveSelectedTracks(
      reactiveSelectedTracks().filter((listId) => !ids.includes(listId)),
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
