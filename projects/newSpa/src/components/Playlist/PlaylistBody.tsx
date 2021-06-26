import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Paper } from '@material-ui/core';
import { useEffect, useState } from 'react';
import * as React from 'react';
import BaseTable, { AutoResizer } from 'react-base-table';
import styled from 'styled-components';

import { SimpleTrack } from '../../../generated/graphql';
import { useRouterTrackList } from '../ResultsTable/ResultsTableBody/cellRenderers/actionCell';
import DraggableTrack from './DraggableTrack';
import playlistColumns from './playlistColumns';

const PlaylistBody = ({ tracks }: { tracks: Array<SimpleTrack> }) => {
  const { replaceTracks } = useRouterTrackList();
  const [orderedTracks, setOrderedTracks] = useState(tracks);
  useEffect(() => setOrderedTracks(tracks), [tracks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
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

  console.log({ tracks });
  return orderedTracks.length ? (
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
                console.log('playlist', width, height)
                return (
                  <BaseTable
                    data={tracks}
                    columns={playlistColumns}
                    width={width}
                    height={height}
                    headerHeight={40}
                    rowHeight={30}
                  />
                )
              }}
            </AutoResizer>
          </TableContainer>
          {/* {orderedTracks.map((track) => ( */}
          {/*  <DraggableTrack key={track.id} track={track} dragging={dragging} /> */}
          {/* ))} */}
        </SortableContext>
      </DndContext>{' '}
    </PlaylistContainer>
  ) : null;
};

const TableContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const PlaylistContainer = styled(Paper)`
  font-size: 10px;
  box-sizing: border-box;
  margin-top: 10px;
  padding: 0;
  width: 100%;
  height: 100%;
`;

export default PlaylistBody;
