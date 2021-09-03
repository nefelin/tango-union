import { DraggableId } from '../store/types';
import { useDraggable } from './useDraggable';
import { useDroppable } from './useDroppable';

export const useSortable = (id: DraggableId) => {
  const { isOver, listeners: droppableListeners } = useDroppable(id);
  const { listeners: draggableListeners } = useDraggable(id);

  return {
    isOver,
    listeners: {
      ...droppableListeners,
      ...draggableListeners,
    },
  };
};
