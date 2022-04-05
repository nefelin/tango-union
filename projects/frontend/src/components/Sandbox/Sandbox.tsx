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
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragIndicator } from '@mui/icons-material';
import React, { useState } from 'react';

import { PlaylistTrack } from '../../hooks/state/usePlaylistsState/types';
import { playlistTrackFromTrack } from '../../types/compactTrack/util';
import { useIsMobile } from '../../util/isMobile';
import { darienzoLaborde } from '../PlaylistSummary/summarize.test.data';
import { SongCard } from '../SongCard';

const playlistTracks = darienzoLaborde.map(playlistTrackFromTrack);
const Sandbox = () => {
  const [items, setItems] = useState(playlistTracks);
  const isMobile = useIsMobile();
  const sensors = useSensors(
    isMobile ? useSensor(TouchSensor) : useSensor(PointerSensor),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map(item => ({...item, id: item.listId}))} strategy={verticalListSortingStrategy}>
        {items.map((track) => (
          <SortableItem key={track.listId} track={track} />
        ))}
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    console.log({active, over})

    if (active.id !== over.id){
      setItems((prevItems) => {
        const oldIndex = prevItems.findIndex(({listId}) => listId === active.id);
        const newIndex = prevItems.findIndex(({listId}) => listId === over.id);

        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  }
};

export function SortableItem({track}: {track: PlaylistTrack}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: track.listId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'manipulation',
  };

  const noFn = () => {};
  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="flex h-full items-center bg-gray-100 my-0.5">
        <div
          className="border-r-white border-r h-full"
          {...listeners}
        >
          <DragIndicator color="disabled" />
        </div>
        <SongCard
          track={track}
          onPlay={() => console.log('play')}
          onMore={noFn}
          active={false}
          playing={false}
        />
      </div>
    </div>
  );
}

export default Sandbox;
