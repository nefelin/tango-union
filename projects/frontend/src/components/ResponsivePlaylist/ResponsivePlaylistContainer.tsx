import {
  closestCenter,
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React, { useEffect, useState } from 'react';

import { QUICKLIST_PLAYLIST_ID } from '../../hooks/state/useGlobalPlaylistState/songLists.state';
import { usePlaylistState } from '../../hooks/state/usePlaylistState';
import { useRoutedPlaylist } from '../../hooks/state/useRoutedPlaylist';
import {
  compactTrackFromString,
} from '../../types/compactTrack/util';
import { useIsMobile } from '../../util/isMobile';
import useCacheStitchedIdFetch from '../ResultsTable/useCacheStitchedIdFetch';
import ResponsivePlaylistBody from './ResponsivePlaylistBody';

const ResponsivePlaylistContainer = ({
  simpleCards,
  sortable,
}: {
  simpleCards?: boolean;
  sortable?: boolean;
}) => {
  const {
    playlist: { tracks: playlistTracks },
    loadTracks,
    rearrangeTracks,
  } = usePlaylistState(QUICKLIST_PLAYLIST_ID);
  const { tracks: routedTracks } = useRoutedPlaylist();
  const [tracks] = useCacheStitchedIdFetch(playlistTracks);
  const isMobile = useIsMobile();
  const sensors = useSensors(
    isMobile ? useSensor(TouchSensor) : useSensor(PointerSensor),
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex =
        tracks?.findIndex(({ listId }) => listId === active.id) ?? 0;
      const newIndex =
        tracks?.findIndex(({ listId }) => listId === over.id) ?? 0;
      const newTracks = arrayMove(playlistTracks, oldIndex, newIndex);
      rearrangeTracks(newTracks);
    }
  }

  useEffect(() => {
    loadTracks(routedTracks.map(compactTrackFromString));
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={tracks?.map((item) => ({ ...item, id: item.listId })) || []}
        strategy={verticalListSortingStrategy}
      >
        <ResponsivePlaylistBody
          simpleCards={simpleCards}
          sortable={sortable}
          tracks={tracks ?? []}
        />
      </SortableContext>
    </DndContext>
  );
};

export default ResponsivePlaylistContainer;
