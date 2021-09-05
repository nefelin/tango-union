import * as React from 'react';
import { useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';

import GlobalDragState from '../context/globalDragState.context';
import { playlistIdFromListId, reactiveSongLists } from '../hooks/state/useGlobalPlaylistState/songLists.state';
import { selectedTracks } from '../hooks/state/usePlaylistsState/util';
import { useSearchbarState } from '../hooks/state/useSearchbarState';
import { reactiveActivePlaylistId } from '../hooks/state/useSelectionState';
import { CompactTrack, ListId } from '../types/CompactTrack';
import { CustomDragMode } from './DragContext/props';
import DndContext from './DragNDrop/DnDContext';
import { Counter } from './DragNDrop/Dragger/Counter/Counter';
import { DragOverEvent, State } from './DragNDrop/store/types';
import { moveMany } from './Playlist/PlaylistBody/util';

const DragContext: React.FunctionComponent = ({ children }) => {
  const [dragging, setDragging] = useState(false);
  const [dragMode, setDragMode] = useState<CustomDragMode>('move');
  const { searchFromIds } = useSearchbarState();

  const handleDragStart = () => {
    // setDragging(true);
  };
  const handleDragEnd = (state: State) => {
    const {overId, overPosition} = state;
    const lists = reactiveSongLists()
    const sourcePlaylistId = reactiveActivePlaylistId()
    const destPlaylistId = playlistIdFromListId(overId ?? '')
    const sourceList = lists[sourcePlaylistId ?? '']
    const destList = lists[destPlaylistId ?? ''];

    if (!sourceList || !destList) {
      return;
    }

    const { selection } = sourceList;

    if (destPlaylistId && overId && sourcePlaylistId === destPlaylistId) {
      const forward = overPosition?.[0] === 'bottom';
      const {tracks} = destList;
      const newTracks = moveMany(tracks, [...selection], overId, forward)
      reactiveSongLists({...lists, [destList.id]: {...destList, tracks: newTracks}})
    }
    // if (dragMode === 'search') {
    //   const activeList = reactiveActivePlaylistId();
    //   if (activeList) {
    //     const thisList = reactiveSongLists()[activeList];
    //     if (thisList) {
    //       searchFromIds(selectedTracks(thisList));
    //     }
    //   }
    // }
    // unstable_batchedUpdates(() => {
    //   setDragMode('move');
    //   setDragging(false);
    // });
  };

  const handleDragOver = ({ overId }: DragOverEvent) => {
    // if (overId === 'searchbar') {
    //   setDragMode('search');
    // } else {
    //   setDragMode('move');
    // }
  };

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
