import { MouseEvent, useState } from 'react';

import { LocalSongId} from './usePlaylistsState/types';
import { useSelectionState } from './useSelectionState';

export const useSelectionHandlers = (id: LocalSongId) => {
  const { removeSelected, addSelected, replaceSelected, isSelected } =
    useSelectionState();
  const [startedSelected, setStartedSelected] = useState(false);

  const toggleSelected = () => {
    if (isSelected(id)) {
      removeSelected(id);
    } else {
      addSelected(id);
    }
  };

  const handlers = {
    onMouseDown: (e: MouseEvent) => {
      // fixme at proper shift selecting
      if (!isSelected(id)) {
        if (e.metaKey || e.shiftKey) {
          addSelected(id);
          setStartedSelected(false);
        } else {
          replaceSelected(id);
          setStartedSelected(true);
        }
      } else {
        setStartedSelected(true);
      }
    },

    onMouseUp: (e: MouseEvent) => {
      if (isSelected(id) && startedSelected) {
        if (e.metaKey || e.shiftKey) {
          removeSelected(id);
        } else {
          replaceSelected(id);
        }
      }
    },
  };

  return {
    isSelected: () => isSelected(id),
    handlers
  }
};
