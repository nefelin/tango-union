import { MouseEvent, useContext } from 'react';

import { ActionType } from '../store/actions';
import { DndMonitorContext } from '../store/context';
import { DraggableId } from '../store/types';

export const useDraggable = (id: DraggableId) => {
  const { dispatch } = useContext(DndMonitorContext);
  return {
    listeners: {
      onMouseDown: (e: MouseEvent) => {
        dispatch?.({
          type: ActionType.DragInit,
          initCoordinates: { x: e.pageX, y: e.pageY },
        });
      },
    },
  };
};
