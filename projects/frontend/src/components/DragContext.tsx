import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import * as React from 'react';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import GlobalDragState from '../context/globalDragState.context';
import { reactiveSongLists } from '../hooks/state/useGlobalPlaylistState/songLists.state';
import { selectedTuplesFromList } from '../hooks/state/usePlaylistsState/util';
import { useSearchbarState } from '../hooks/state/useSearchbarState';
import { reactiveSelectedPlaylist } from '../hooks/state/useSelectionState';
import CustomDragOverlay from './DragContext/CustomDragOverlay';
import { CustomDragMode } from './DragContext/props';

const DragContext: React.FunctionComponent = ({ children }) => {
  const [dragging, setDragging] = useState(false);
  const [dragMode, setDragMode] = useState<CustomDragMode>('move');
  const { searchFromIds } = useSearchbarState();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 15 },
    }),
  );

  const handleDragStart = (e: DragStartEvent) => setDragging(true);
  const handleDragEnd = (e: DragEndEvent) => {
    if (dragMode === 'search') {
      const activeList = reactiveSelectedPlaylist();
      if (activeList) {
        const thisList = reactiveSongLists()[activeList];
        if (thisList) {
          searchFromIds(selectedTuplesFromList(thisList));
        }
      }
    }
    setDragging(false);
  };
  const handleDragOver = (e: DragOverEvent) => {
    if (e.over?.id === 'searchbar') {
      setDragMode('search');
    } else {
      setDragMode('move');
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
    >
      <GlobalDragState.Provider value={{ dragging }}>
        {children}
        {createPortal(
          <CustomDragOverlay dragging={dragging} count={1} mode={dragMode} />,
          document.body,
        )}
      </GlobalDragState.Provider>
    </DndContext>
  );
};

export default DragContext;
