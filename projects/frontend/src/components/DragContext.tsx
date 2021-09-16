import React, { useContext } from 'react';

import {
  deleteSelectedTracks,
  playlistIdFromListId,
  QUICKLIST_PLAYLIST_ID,
  reactiveSongLists,
} from '../hooks/state/useGlobalPlaylistState/songLists.state';
import { selectedTracks } from '../hooks/state/usePlaylistsState/util';
import { useSearchbarState } from '../hooks/state/useSearchbarState';
import { FocusContext } from '../hooks/useFocusable';
import {
  regenListIds,
} from '../types/compactTrack/util';
import DndContext from './DragNDrop/DnDContext';
import DraggerSwitcher from './DragNDrop/Dragger/DraggerSwitcher';
import { State } from './DragNDrop/store/types';
import { NEW_PLAYLIST_ID } from './Playlist/EmptyPlaylist';
import { moveMany } from './Playlist/PlaylistBody/util';
import { TRASH_DROPPABLE_ID } from './Playlist/TrashHeader';
import { SEARCHBAR_DROPPABLE_ID } from './Searchbar';

const DragContext: React.FunctionComponent = ({ children }) => {
  const { searchFromIds } = useSearchbarState();
  const { focused } = useContext(FocusContext);

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
      const activeList = focused;
      if (activeList) {
        const thisList = reactiveSongLists()[activeList];
        if (thisList) {
          searchFromIds(selectedTracks(thisList));
        }
      }
      return;
    }

    const lists = reactiveSongLists();
    const sourcePlaylistId = focused;
    const destPlaylistId = playlistIdFromListId(overId ?? '');
    const sourceList = lists[sourcePlaylistId ?? ''];
    const destList = lists[destPlaylistId ?? ''];

    const forward = overPosition?.[0] === 'bottom';

    if (overId === TRASH_DROPPABLE_ID) {
      deleteSelectedTracks(focused ?? '')
      return;
    }

    // over new playlist big droppable, append to end;
    if (overId === NEW_PLAYLIST_ID) {
      const thisList = reactiveSongLists()[focused ?? ''];
      if (thisList) {
        const tracks = selectedTracks(thisList).map(regenListIds);
        const quickList = reactiveSongLists()[QUICKLIST_PLAYLIST_ID];
        if (!quickList) {
          return;
        }
        reactiveSongLists({
          ...reactiveSongLists(),
          [QUICKLIST_PLAYLIST_ID]: {
            ...quickList,
            tracks: [...quickList.tracks, ...tracks],
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

    if (!destList.readOnly) {
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
    }
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      draggerElement={<DraggerSwitcher />}
    >
      {children}
    </DndContext>
  );
};

export default DragContext;
