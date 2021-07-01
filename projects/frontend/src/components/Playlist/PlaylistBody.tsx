import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DropAnimation,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { snapCenterToCursor } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import * as React from 'react';
import BaseTable, { AutoResizer } from 'react-base-table';
import { createPortal } from 'react-dom';

import { SimpleTrack } from '../../../generated/graphql';
import { useRouterTrackList } from '../ResultsTable/ResultsTableBody/cellRenderers/actionCell';
import { playlistRowRenderer } from './DraggableTrack';
import { PlaylistContainer, TableContainer } from './PlaylistBody/styles';
import TrackCountOverlay from './PlaylistBody/TrackCountOverlay';
import playlistColumns from './playlistColumns';

const PlaylistBody = ({ tracks }: { tracks: Array<SimpleTrack> }) => {
  const { replaceTracks } = useRouterTrackList();
  const [orderedTracks, setOrderedTracks] = useState(tracks);
  useEffect(() => setOrderedTracks(tracks), [tracks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 15 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const [dragging, setDragging] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setDragging(false);

    if (active && over && active.id !== over.id) {
      const oldIndex = tracks.findIndex(
        ({ id }) => id.toString() === active.id,
      );
      const newIndex = tracks.findIndex(({ id }) => id.toString() === over.id);
      replaceTracks(arrayMove(tracks, oldIndex, newIndex).map(({ id }) => id));
    }
  };

  return (
    <PlaylistContainer>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={() => setDragging(true)}
      >
        <SortableContext
          items={orderedTracks?.map(({ id }) => id.toString()) || []}
          strategy={verticalListSortingStrategy}
        >
          <TableContainer>
            <AutoResizer>
              {({ width, height }) => {
                return (
                  <BaseTable
                    rowKey="fakeId"
                    data={tracks.map((track, index) => ({
                      ...track,
                      fakeId: `${track.id}_${index}`, // gnarly way to allow duplicate rows
                    }))}
                    columns={playlistColumns}
                    width={width}
                    height={height}
                    headerHeight={40}
                    rowHeight={30}
                    rowRenderer={playlistRowRenderer()}
                  />
                );
              }}
            </AutoResizer>
          </TableContainer>
          {createPortal(
            <TrackCountOverlay dragging={dragging} count={1} />,
            document.body,
          )}
        </SortableContext>
      </DndContext>
    </PlaylistContainer>
  );
};

export const defaultDropAnimation: DropAnimation = {
  duration: 250,
  easing: 'ease',
  dragSourceOpacity: 0.5,
};

export default PlaylistBody;
