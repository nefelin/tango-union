import * as React from 'react';
import { useState } from 'react';

import GlobalDragState from '../context/globalDragState.context';
import { reactiveSongLists } from '../hooks/state/useGlobalPlaylistState/songLists.state';
import { selectedTuplesFromList } from '../hooks/state/usePlaylistsState/util';
import { useSearchbarState } from '../hooks/state/useSearchbarState';
import { reactiveSelectedPlaylist } from '../hooks/state/useSelectionState';
import { CustomDragMode } from './DragContext/props';
import DndContext from './DragNDrop/DnDContext';
import { Counter } from './DragNDrop/Dragger/Counter/Counter';
import { DragOverEvent } from './DragNDrop/store/types';

const DragContext: React.FunctionComponent = ({ children }) => {
  const [dragging, setDragging] = useState(false);
  const [dragMode, setDragMode] = useState<CustomDragMode>('move');
  const { searchFromIds } = useSearchbarState();

  const handleDragStart = () => setDragging(true);
  const handleDragEnd = () => {
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
  const handleDragOver = ({ overId }: DragOverEvent) => {
    console.log({overId})
    if (overId === 'searchbar') {
      setDragMode('search');
    } else {
      setDragMode('move');
    }
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      draggerElement={dragMode === 'search' ? '?' : <Counter />}
    >
      <GlobalDragState.Provider value={{ dragging }}>
        {children}
      </GlobalDragState.Provider>
    </DndContext>
  );
};

export default DragContext;
