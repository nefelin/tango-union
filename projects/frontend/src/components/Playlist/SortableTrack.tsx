import { useReactiveVar } from '@apollo/client';
import React, { useContext } from 'react';
import { BaseTableProps } from 'react-base-table';

import { PlaylistConfigContext } from '../../context/playlistConfig.context';
import { useHoveredRowState } from '../../hooks/state/useHoveredRowState';
import { PlaylistTrack } from '../../hooks/state/usePlaylistsState/types';
import { usePlaylistState } from '../../hooks/state/usePlaylistState';
import { useSelectionHandlers } from '../../hooks/state/useSelectionHandlers';
import { useSelectionState } from '../../hooks/state/useSelectionState';
import { useYoutubePlayerState } from '../../hooks/state/useYoutubePlayerState';
import { compressTrack } from '../../types/compactTrack/util';
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
    <SortableTrack cells={cells} rowData={rowData} rowIndex={rowIndex} />;

const SortableTrack = ({ rowData: track, cells, rowIndex }: Props) => {
  const id = track.listId;

  const { name: playlistId } = useContext(PlaylistConfigContext);
  const {
    playlist: { readOnly },
  } = usePlaylistState(playlistId);

  const { trackStatus, play } = useYoutubePlayerState();
  const { listeners: hoverListeners } = useHoveredRowState(rowIndex);

  const status = trackStatus(track);

  const { selectionStatus } = useSelectionState();
  const { handlers } = useSelectionHandlers(track.listId);

  const { listeners, styles } = useSortable(id);

  const mergedListeners = mergeListenerMaps([
    listeners,
    handlers,
    hoverListeners,
  ]);

  const readOnlyStyles = readOnly ? {} : styles; // only use track insert styles if readonly is false
  return (
    <>
      <PlayableRow
        className="group"
        style={readOnlyStyles}
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

export default SortableTrack;
