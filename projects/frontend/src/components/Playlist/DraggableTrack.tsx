import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { CSSProperties } from 'react';
import { BaseTableProps } from 'react-base-table';

import { SimpleTrack } from '../../../generated/graphql';
import PlayableRow from '../PlayableRow';
import {
  playTrackId,
  useTrackStatus,
} from '../YoutubePlayer/youtubePlayer.state';

interface Props {
  cells: Array<React.ReactNode>;
  rowData: SimpleTrack;
}

export const playlistRowRenderer =
  (): BaseTableProps<SimpleTrack>['rowRenderer'] =>
  ({ cells, rowData }) =>
    <DraggableTrack cells={cells} rowData={rowData} />;

const DraggableTrack = ({ rowData: track, cells }: Props) => {
  const status = useTrackStatus(track.id, 'playlist');
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: track.id.toString() });

  const draggingStyle: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    height: 2,
    backgroundColor: 'blue',
    width: '100%',
    zIndex: 10,
  };

  return (
    <>
      {isDragging && (
        <PlayableRow
          style={{position: 'absolute', zIndex:11}}
          status={status}
          onDoubleClick={() => playTrackId(track.id, 'playlist')}
        >
          {cells}
        </PlayableRow>
      )}
      <PlayableRow
        status={status}
        onDoubleClick={() => playTrackId(track.id, 'playlist')}
        ref={setNodeRef}
        style={isDragging ? draggingStyle : {}}
        {...attributes}
        {...listeners}
      >
        {!isDragging && cells}
      </PlayableRow>

    </>
  );
};

export default DraggableTrack;
