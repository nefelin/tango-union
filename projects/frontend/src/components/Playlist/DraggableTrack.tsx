import React from 'react';
import { BaseTableProps } from 'react-base-table';

import { useHoveredRowState } from '../../hooks/state/useHoveredRowState';
import { PlaylistTrack } from '../../hooks/state/usePlaylistsState/types';
import { useSelectionHandlers } from '../../hooks/state/useSelectionHandlers';
import { useSelectionState } from '../../hooks/state/useSelectionState';
import { useYoutubePlayerState } from '../../hooks/state/useYoutubePlayerState';
import { compressTrack } from '../../types/CompactTrack';
import mergeListenerMaps from '../../util/mergeListenerMaps';
import { useSortable } from '../DragNDrop/hooks/useSortable';
import PlayableRow from '../PlayableRow';

interface Props {
  cells: Array<React.ReactNode>;
  rowData: PlaylistTrack;
  rowIndex: number;
}

export const playlistRowRenderer =
  (): BaseTableProps<PlaylistTrack>['rowRenderer'] =>
  ({ cells, rowData, rowIndex }) =>
    <DraggableTrack cells={cells} rowData={rowData} rowIndex={rowIndex} />;

const DraggableTrack = ({ rowData: track, cells, rowIndex }: Props) => {
  const id = track.listId;

  const { trackStatus, play } = useYoutubePlayerState();
  const { listeners: hoverListeners } = useHoveredRowState(rowIndex);

  const status = trackStatus(track);

  const { selectionStatus } = useSelectionState();
  const { handlers } = useSelectionHandlers(track.listId);

  const { listeners } = useSortable(id);

  const mergedListeners = mergeListenerMaps([
    listeners,
    handlers,
    hoverListeners,
  ]);

  return (
    <>
      <PlayableRow
        status={status}
        selectionStatus={selectionStatus(track.listId)}
        onDoubleClick={() => play(compressTrack(track))}
        {...mergedListeners}
      >
        {cells}
      </PlayableRow>
    </>
  );
};

export default DraggableTrack;
