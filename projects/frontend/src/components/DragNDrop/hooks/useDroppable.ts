import {MouseEvent, useContext} from 'react';

import {ActionType} from '../store/actions';
import {DndMonitorContext} from '../store/context';
import {DroppableId} from '../store/types';

export const useDroppable = (id: DroppableId) => {
    const {state, dispatch} = useContext(DndMonitorContext)

    return {
        isOver: state?.overId === id,
        listeners: state?.dragMode ? {
            onMouseLeave: (e: MouseEvent) => {
                dispatch?.({
                    type: ActionType.DragOver,
                    overId: null,
                })
            },
            onMouseOver: (e: MouseEvent) => {
                dispatch?.({
                    type: ActionType.DragOver,
                    overId: id,
                })
            }
        } : {}
    }
}