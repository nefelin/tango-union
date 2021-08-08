import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { CSSProperties } from 'react';
import { BaseTableProps } from 'react-base-table';

import { useHoveredRowState } from '../../hooks/state/useHoveredRowState';
import { PlaylistTrack } from '../../hooks/state/usePlaylistsState/types';
import { tupleIdFromPlaylistTrack } from '../../hooks/state/usePlaylistsState/util';
import { useSelectionHandlers } from '../../hooks/state/useSelectionHandlers';
import { useYoutubePlayerState } from '../../hooks/state/useYoutubePlayerState';
import PlayableRow from '../PlayableRow';

interface Props {
  cells: Array<React.ReactNode>;
  rowData: PlaylistTrack;
  rowIndex: number;
}

const DRAGGED_TRACK_Z_INDEX = 10;

export const playlistRowRenderer =
  (): BaseTableProps<PlaylistTrack>['rowRenderer'] =>
  ({ cells, rowData, rowIndex }) =>
    <DraggableTrack cells={cells} rowData={rowData} rowIndex={rowIndex} />;

const DraggableTrack = ({ rowData: track, cells, rowIndex}: Props) => {
  const { trackStatus, play } = useYoutubePlayerState();
  const { listeners: hoverListeners } = useHoveredRowState(rowIndex);

  const status = trackStatus(track);

  const { isSelected, handlers } = useSelectionHandlers(track.localSongId);

  const id = track.localSongId;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const draggingStyle: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    height: 1,
    border: 'none',
    backgroundColor: 'blue',
    width: '100%',
    zIndex: DRAGGED_TRACK_Z_INDEX,
  };

  return (
    <>
      {isDragging && (
        <PlayableRow
          style={{ position: 'absolute', zIndex: DRAGGED_TRACK_Z_INDEX+1 }}
          status={status}
          selected={isSelected()}
        >
          {cells}
        </PlayableRow>
      )}
      <PlayableRow
        {...hoverListeners}
        status={status}
        selected={isSelected()}
        onDoubleClick={() => play(tupleIdFromPlaylistTrack(track))}
        ref={setNodeRef}
        style={isDragging ? draggingStyle : {}}
        {...attributes}
        {...listeners}
        {...handlers}
      >
        {!isDragging && cells}
      </PlayableRow>
    </>
  );
};

export default DraggableTrack;
