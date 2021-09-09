import React from 'react';

import {
  playlistIdFromListId,
  QUICKLIST_PLAYLIST_ID,
  reactiveSongLists,
} from '../hooks/state/useGlobalPlaylistState/songLists.state';
import { newSongList } from '../hooks/state/useGlobalPlaylistState/util';
import { selectedTracks } from '../hooks/state/usePlaylistsState/util';
import { useSearchbarState } from '../hooks/state/useSearchbarState';
import { reactiveActivePlaylistId } from '../hooks/state/useSelectionState';
import { regenListIds } from '../types/compactTrack/util';
import DndContext from './DragNDrop/DnDContext';
import { Counter } from './DragNDrop/Dragger/Counter/Counter';
import { State } from './DragNDrop/store/types';
import { NEW_PLAYLIST_ID } from './Playlist/EmptyPlaylist';
import { moveMany } from './Playlist/PlaylistBody/util';
import { SEARCHBAR_DROPPABLE_ID } from './Searchbar';

const DragContext: React.FunctionComponent = ({ children }) => {
  const { searchFromIds } = useSearchbarState();

  const handleDragStart = () => {
    // setDragging(true);
  };
  const handleDragEnd = (state: State) => {
    const { overId, overPosition } = state;

    if (!overId) {
      return;
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

    const lists = reactiveSongLists();
    const sourcePlaylistId = reactiveActivePlaylistId();
    const destPlaylistId = playlistIdFromListId(overId ?? '');
    const sourceList = lists[sourcePlaylistId ?? ''];
    const destList = lists[destPlaylistId ?? ''];

    const forward = overPosition?.[0] === 'bottom';

    // over new playlist, start playlist;
    if (overId === NEW_PLAYLIST_ID) {
      const thisList = reactiveSongLists()[reactiveActivePlaylistId() ?? ''];
      if (thisList) {
        const tracks = selectedTracks(thisList).map(regenListIds);
        reactiveSongLists({
          ...reactiveSongLists(),
          [QUICKLIST_PLAYLIST_ID]: {
            ...newSongList(QUICKLIST_PLAYLIST_ID),
            tracks,
          },
        });
      }
      return;
    }

    if (!sourceList || !destList) {
      return;
    }

    const { selection } = sourceList;
    const { tracks } = destList;

    // same playlist move tracks
    if (destPlaylistId && sourcePlaylistId === destPlaylistId) {
      const newTracks = moveMany(tracks, [...selection], overId, forward);
      reactiveSongLists({
        ...lists,
        [destList.id]: { ...destList, tracks: newTracks },
      });
    } else {
      const insertI =
        tracks.findIndex(({ listId }) => listId === overId) + (forward ? 1 : 0);
      // fixme need new ideas for these inserts
      const insertTracks = sourceList.tracks
        .filter(({ listId }) => selection.has(listId))
        .map(regenListIds);
      const newTracks = [
        ...tracks.slice(0, insertI),
        ...insertTracks,
        ...tracks.slice(insertI, tracks.length),
      ];
      reactiveSongLists({
        ...lists,
        [destList.id]: { ...destList, tracks: newTracks },
      });
    }
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      draggerElement={<Counter />}
    >
      {children}
    </DndContext>
  );
};

export default DragContext;
