import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import { BaseTableProps } from 'react-base-table';
import styled from 'styled-components';

import { SimpleTrack } from '../../../generated/graphql';
import PlayableRow from '../PlayableRow';
import {
  playTrackId,
  useTrackStatus,
} from '../YoutubePlayer/youtubePlayer.state';

interface Props {
  cells: Array<React.ReactNode>;
  rowData: SimpleTrack;
  dragging: boolean;
}

export const playlistRowRenderer =
  (dragging: boolean): BaseTableProps<SimpleTrack>['rowRenderer'] =>
  ({ cells, rowData }) =>
    <DraggableTrack cells={cells} rowData={rowData} dragging={dragging} />;

const DraggableTrack = ({ rowData: track, cells, dragging }: Props) => {
  const status = useTrackStatus(track.id, 'playlist');
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: track.id.toString() });

  const conditionalTransition = dragging ? transition || '' : '';

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: conditionalTransition,
    zIndex: 10,
  };

  return (
    <PlayableRow
      status={status}
      onDoubleClick={() => playTrackId(track.id, 'playlist')}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {cells}
    </PlayableRow>
  );
};

export default DraggableTrack;
