import { MouseEvent, useContext, useState } from 'react';

import { PlaylistConfigContext } from '../../context/playlistConfig.context';
import { ListId } from '../../types/CompactTrack';
import { reactiveSongLists } from './useGlobalPlaylistState/songLists.state';
import {
  reactiveSelectedPlaylist,
  useSelectionState,
} from './useSelectionState';

export const useSelectionHandlers = (id: ListId) => {
  const { removeSelected, addSelected, replaceSelected, selectionStatus } =
    useSelectionState();
  const [startedSelected, setStartedSelected] = useState(false);
  const { name: playlistId } = useContext(PlaylistConfigContext);

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
          const tail = !!selection.length && selection[selection.length - 1];

          if (tail) {
            const tailIndex = tracks.findIndex(({ listId }) => tail === listId);
            const thisIndex = tracks.findIndex(({ listId }) => id === listId);
            const ordered =
              tailIndex > thisIndex
                ? [thisIndex, tailIndex]
                : [tailIndex, thisIndex];
            const tracksToAdd = tracks
              .slice(ordered[0], ordered[1])
              .map(({ listId }) => listId);
            addSelected(...tracksToAdd);
          }
          addSelected(id);
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
          return;
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
    handlers,
  };
};
