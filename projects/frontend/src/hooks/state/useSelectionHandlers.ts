import { MouseEvent, useContext, useState } from 'react';

import { PlaylistConfigContext } from '../../context/playlistConfig.context';
import { reactiveSongLists } from './useGlobalPlaylistState/songLists.state';
import { LocalSongId} from './usePlaylistsState/types';
import { localSongIdFromTrackIdTuple } from './usePlaylistsState/util';
import { reactiveSelectedPlaylist, useSelectionState } from './useSelectionState';

export const useSelectionHandlers = (id: LocalSongId) => {
  const { removeSelected, addSelected, replaceSelected, selectionStatus } =
    useSelectionState();
  const [startedSelected, setStartedSelected] = useState(false);
  const {name: playlistId} = useContext(PlaylistConfigContext);

  const handlers = {
    onMouseDown: (e: MouseEvent) => {
      reactiveSelectedPlaylist(playlistId);
      if (selectionStatus(id) === null) {
        setStartedSelected(false);
        if (e.metaKey) {
          addSelected(id);
        } else if (e.shiftKey) {
          const playlist = reactiveSongLists()[playlistId];
          const tracks = playlist?.tracks ?? [];
          const selection = playlist?.selection ?? [];
          const tail = !!selection.length && selection[selection.length-1];

          if (tail) {
            const tailIndex = tracks.findIndex(([_, localSongId]) => tail === localSongId);
            const thisIndex = tracks.findIndex(([_, localSongId]) => id === localSongId);
            const ordered = tailIndex > thisIndex ? [thisIndex, tailIndex] : [tailIndex, thisIndex];
            const tracksToAdd = tracks.slice(ordered[0], ordered[1]).map(localSongIdFromTrackIdTuple);
            addSelected(...tracksToAdd)
          }
          addSelected(id)
        } else {
          replaceSelected(id);
        }
      } else {
        setStartedSelected(true);
      }
    },

    onMouseUp: (e: MouseEvent) => {
      if (selectionStatus(id) !== null && startedSelected) {
        if (e.shiftKey) {
          return
        }
        if (e.metaKey) {
          removeSelected(id);
        } else {
          replaceSelected(id);
        }
      }
    },
  };

  return {
    handlers
  }
};
