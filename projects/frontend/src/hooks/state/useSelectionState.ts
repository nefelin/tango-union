import { useContext } from 'react';

import { PlaylistConfigContext } from '../../context/playlistConfig.context';
import { reactiveSongLists } from './useGlobalPlaylistState/songLists.state';
import { LocalSongId } from './usePlaylistsState/types';

export const useSelectionState = () => {
  // fixme handle copying
  const {name: playlistId} = useContext(PlaylistConfigContext)

  const addSelected = (id: LocalSongId) => {
    const lists = reactiveSongLists();
    const thisList = lists[playlistId];
    if (!thisList) {
      console.error(`Playlist '${playlistId}' not found, can't add selection`)
    } else {
      const newSelection = [...thisList.selection, id];
      reactiveSongLists({...lists, [playlistId]: {...thisList, selection: newSelection}});
    }
  };

  const removeSelected = (...ids: Array<LocalSongId>) => {
    const lists = reactiveSongLists();
    const thisList = lists[playlistId];
    if (!thisList) {
      console.error(`Playlist '${playlistId}' not found, can't add selection`)
    } else {
      const newSelection = thisList.selection.filter((listId) => !ids.includes(listId));
      reactiveSongLists({...lists, [playlistId]: {...thisList, selection: newSelection}});
    }
  };

  const isSelected = (id: LocalSongId) => reactiveSongLists()[playlistId]?.selection.includes(id) ?? false;

  const replaceSelected = (id: LocalSongId) => {
    const lists = reactiveSongLists();
    const thisList = lists[playlistId];
    if (!thisList) {
      console.error(`Playlist '${playlistId}' not found, can't add selection`)
    } else {
      reactiveSongLists({...lists, [playlistId]: {...thisList, selection: [id]}});
    }
  }

  const selected = () => reactiveSongLists()[playlistId]?.selection ?? []

  return {
    selected,
    isSelected,
    replaceSelected,
    addSelected,
    removeSelected,
  };
};
