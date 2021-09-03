import { MouseEvent, useContext, useMemo } from 'react';

import {ActionType} from '../store/actions';
import {DndMonitorContext} from '../store/context';
import {DroppableId, Maybe, Position} from '../store/types';

export const useDroppable = (id: DroppableId) => {
    const {state, dispatch} = useContext(DndMonitorContext)

    const isOver = state?.overId === id;

    const listeners = state?.dragMode ? ({
        onMouseLeave: (e: MouseEvent) => {
            dispatch?.({
                type: ActionType.DragOver,
                overId: null,
                overPosition: null
            })
        },
        onMouseMove: (e: MouseEvent) => {
            if (isOver) {
                const newPosition = positionFromMouseEvent(e);
                if (!samePosition(newPosition, state.overPosition)) {
                    dispatch?.({
                        type: ActionType.DragOver,
                        overId: id,
                        overPosition: newPosition
                    })
                }
            }
        },
        onMouseOver: (e: MouseEvent) => {
            dispatch?.({
                type: ActionType.DragOver,
                overId: id,
                overPosition: positionFromMouseEvent(e)
            })
        }
    }) : {}

    return {
        overPosition: state.overPosition,
        isOver,
        listeners
    }
}

const samePosition = (a: Maybe<Position>, b:Maybe<Position>): boolean => {
    if (!a || !b) {
        return false
    }
    return a[0] === b[0] && a[1] === b[1];
}

const positionFromMouseEvent = (e: MouseEvent): Position => {
    const rect = (e.target as Element).getBoundingClientRect();
    return [e.nativeEvent.offsetY < rect.height / 2 ? 'top' : 'bottom',
        e.nativeEvent.offsetX < rect.width / 2 ? 'left' : 'right']
}