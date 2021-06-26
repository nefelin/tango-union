import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import { BaseTableProps } from 'react-base-table';
import styled from 'styled-components';

import { SimpleTrack } from '../../../generated/graphql';
import { playTrackId } from '../YoutubePlayer/youtubePlayer.state';

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
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: track.id.toString() });

  const conditionalTransition = dragging ? transition || '' : '';

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: conditionalTransition,
  };

  if (track.id === 2582) {
    console.log(style.transform);
  }
  return (
    <RowContainer ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {cells}
    </RowContainer>
  );
};

const RowContainer = styled.div`
  display: flex;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: inherit;
`;

export default DraggableTrack;
