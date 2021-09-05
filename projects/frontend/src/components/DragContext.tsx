import * as React from 'react';
import { useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';

import GlobalDragState from '../context/globalDragState.context';
import { reactiveSongLists } from '../hooks/state/useGlobalPlaylistState/songLists.state';
import { selectedTracks } from '../hooks/state/usePlaylistsState/util';
import { useSearchbarState } from '../hooks/state/useSearchbarState';
import { reactiveActivePlaylistId } from '../hooks/state/useSelectionState';
import { CustomDragMode } from './DragContext/props';
import DndContext from './DragNDrop/DnDContext';
import { Counter } from './DragNDrop/Dragger/Counter/Counter';
import { DragOverEvent } from './DragNDrop/store/types';

const DragContext: React.FunctionComponent = ({ children }) => {
  const [dragging, setDragging] = useState(false);
  const [dragMode, setDragMode] = useState<CustomDragMode>('move');
  const { searchFromIds } = useSearchbarState();

  const handleDragStart = () => {
    console.log('dragStart');
    setDragging(true);
  };
  const handleDragEnd = () => {
    if (dragMode === 'search') {
      const activeList = reactiveActivePlaylistId();
      if (activeList) {
        const thisList = reactiveSongLists()[activeList];
        if (thisList) {
          searchFromIds(selectedTracks(thisList));
        }
      }
    }
    unstable_batchedUpdates(() => {
      setDragMode('move');
      setDragging(false);
    });
  };
  const handleDragOver = ({ overId }: DragOverEvent) => {
    if (overId === 'searchbar') {
      setDragMode('search');
    } else {
      setDragMode('move');
    }
  };

  console.log(dragging);
  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      draggerElement={dragMode === 'search' ? '?' : <Counter />}
    >
      {/* <GlobalDragState.Provider value={{ dragging }}> */}
      {children}
      {/* </GlobalDragState.Provider> */}
    </DndContext>
  );
};

export default DragContext;
