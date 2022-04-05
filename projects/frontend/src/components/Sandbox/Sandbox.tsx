import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragIndicator } from '@mui/icons-material';
import React, { useState } from 'react';

import { playlistTrackFromTrack } from '../../types/compactTrack/util';
import { useIsMobile } from '../../util/isMobile';
import { darienzoLaborde } from '../PlaylistSummary/summarize.test.data';
import { SongCard } from '../SongCard';

const playlistTracks = darienzoLaborde.map(playlistTrackFromTrack);
const Sandbox = () => {
  const [items, setItems] = useState(['1', '2', '3']);
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
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))}
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.indexOf(active.id);
        const newIndex = prevItems.indexOf(over.id);

        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  }
};

export function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          track={playlistTracks[0]}
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
