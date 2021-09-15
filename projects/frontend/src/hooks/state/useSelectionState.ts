import { makeVar } from '@apollo/client';
import { useContext } from 'react';

import { PlaylistConfigContext } from '../../context/playlistConfig.context';
import { ListId } from '../../types/compactTrack/types';
import { Maybe } from '../../types/utility/maybe';
import { FocusableContext, FocusContext } from '../useFocusable';
import { reactiveSongLists } from './useGlobalPlaylistState/songLists.state';

// export const reactiveActivePlaylistId = makeVar<Maybe<string>>(null);

// focused is selected and on active list, selected is selected on passive list, null is no status
export type SelectionStatus = 'focused' | 'selected' | null;

export const useSelectionState = () => {
  // fixme handle copying
  const { name: playlistId } = useContext(PlaylistConfigContext);
  const { focused } = useContext(FocusContext);

  const addSelected = (...ids: Array<ListId>) => {
    const lists = reactiveSongLists();
    const thisList = lists[playlistId];
    if (!thisList) {
      console.error(`Playlist '${playlistId}' not found, can't add selection`);
    } else {
      const newSelection = [...thisList.selection, ...ids];
      reactiveSongLists({
        ...lists,
        [playlistId]: { ...thisList, selection: new Set(newSelection) },
      });
    }
  };

  const removeSelected = (...ids: Array<ListId>) => {
    const lists = reactiveSongLists();
    const thisList = lists[playlistId];
    if (!thisList) {
      console.error(`Playlist '${playlistId}' not found, can't add selection`);
    } else {
      const newSelection = [...thisList.selection].filter(
        (listId) => !ids.includes(listId),
      );
      reactiveSongLists({
        ...lists,
        [playlistId]: { ...thisList, selection: new Set(newSelection) },
      });
    }
  };

  const selectionStatus = (id: ListId): SelectionStatus => {
    if (reactiveSongLists()[playlistId]?.selection.has(id)) {
      if (focused === playlistId) {
        return 'focused';
      }
      return 'selected';
    }
    return null;
  };

  const replaceSelected = (...ids: Array<ListId>) => {
    const lists = reactiveSongLists();
    const thisList = lists[playlistId];
    if (!thisList) {
      console.error(`Playlist '${playlistId}' not found, can't add selection`);
    } else {
      reactiveSongLists({
        ...lists,
        [playlistId]: { ...thisList, selection: new Set(ids) },
      });
    }
  };

  const selected = () => reactiveSongLists()[playlistId]?.selection ?? [];

  return {
    selected,
    selectionStatus,
    replaceSelected,
    addSelected,
    removeSelected,
  };
};
