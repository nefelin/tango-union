import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import * as React from 'react';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import GlobalDragState from '../context/globalDragState.context';
import TrackCountOverlay from './Playlist/PlaylistBody/TrackCountOverlay';

const DragContext: React.FunctionComponent = ({ children }) => {
  const [dragging, setDragging] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 15 },
    }),
  );

  const handleDragStart = (e: DragStartEvent) => setDragging(true);
  const handleDragEnd = (e: DragEndEvent) => setDragging(false);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <GlobalDragState.Provider value={{ dragging }}>
        {children}
        {createPortal(
          <TrackCountOverlay dragging={dragging} count={1} />,
          document.body,
        )}
      </GlobalDragState.Provider>
    </DndContext>
  );
};

export default DragContext;
