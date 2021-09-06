import * as React from 'react';
import { useState } from 'react';

import { playlistIdFromListId, reactiveSongLists } from '../hooks/state/useGlobalPlaylistState/songLists.state';
import { selectedTracks } from '../hooks/state/usePlaylistsState/util';
import { useSearchbarState } from '../hooks/state/useSearchbarState';
import { reactiveActivePlaylistId } from '../hooks/state/useSelectionState';
import { regenListIds } from '../types/CompactTrack';
import { CustomDragMode } from './DragContext/props';
import DndContext from './DragNDrop/DnDContext';
import { Counter } from './DragNDrop/Dragger/Counter/Counter';
import { DragOverEvent, State } from './DragNDrop/store/types';
import { moveMany } from './Playlist/PlaylistBody/util';
import { SEARCHBAR_DROPPABLE_ID } from './Searchbar';

const DragContext: React.FunctionComponent = ({ children }) => {
  const [dragging, setDragging] = useState(false);
  const [dragMode, setDragMode] = useState<CustomDragMode>('move');
  const { searchFromIds } = useSearchbarState();

  const handleDragStart = () => {
    // setDragging(true);
  };
  const handleDragEnd = (state: State) => {
    console.log('handle drag end', state)
    const {overId, overPosition} = state;

    if (!overId) {
      return
    }

    // over searchbar, search for similar
    if (overId === SEARCHBAR_DROPPABLE_ID) {
      const activeList = reactiveActivePlaylistId();
      if (activeList) {
        const thisList = reactiveSongLists()[activeList];
        if (thisList) {
          searchFromIds(selectedTracks(thisList));
        }
      }
      return;
    }

    const lists = reactiveSongLists()
    const sourcePlaylistId = reactiveActivePlaylistId()
    const destPlaylistId = playlistIdFromListId(overId ?? '')
    const sourceList = lists[sourcePlaylistId ?? '']
    const destList = lists[destPlaylistId ?? ''];

    const forward = overPosition?.[0] === 'bottom';

    if (!sourceList || !destList) {
      return;
    }

    const { selection } = sourceList;
    const {tracks} = destList;

    // same playlist move tracks
    if (destPlaylistId && sourcePlaylistId === destPlaylistId) {
      const newTracks = moveMany(tracks, [...selection], overId, forward)
      reactiveSongLists({...lists, [destList.id]: {...destList, tracks: newTracks}})
    } else {
      const insertI = tracks.findIndex(({listId}) => listId === overId) + (forward ? 1 : 0);
      // fixme need new ideas for these inserts
      const insertTracks = sourceList.tracks.filter(({listId}) => selection.has(listId)).map(regenListIds);
      const newTracks = [...tracks.slice(0, insertI), ...insertTracks, ...tracks.slice(insertI, tracks.length)]
      reactiveSongLists({...lists, [destList.id]: {...destList, tracks: newTracks}})
    }
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
