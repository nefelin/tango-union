import { CSSProperties, useMemo } from 'react';

import {DraggableId} from '../store/types';
import {useDraggable} from './useDraggable';
import {useDroppable} from './useDroppable';

export const useSortable = (id: DraggableId) => {
    const {isOver, overPosition, listeners: droppableListeners} = useDroppable(id)
    const {listeners: draggableListeners} = useDraggable(id)

    const border:  CSSProperties = overPosition?.[0] === 'top' ? {borderTop: '2px solid blue'} :{borderBottom: '2px solid blue'} ;

    const styles: CSSProperties = isOver ? { ...border } : {};

    const listeners = ({...droppableListeners, ...draggableListeners})
    return {
        isOver,
        styles,
        listeners
    }
}
