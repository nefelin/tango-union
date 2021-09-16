import { DeleteOutline } from '@material-ui/icons';
import React from 'react';

import { useDroppable } from '../DragNDrop/hooks/useDroppable';

export const TRASH_DROPPABLE_ID = 'trashcan'
const TrashHeader = () => {
  const {listeners} = useDroppable(TRASH_DROPPABLE_ID);

  return <div style={{cursor: 'pointer'}} {...listeners}><DeleteOutline /></div>
}
export default TrashHeader;