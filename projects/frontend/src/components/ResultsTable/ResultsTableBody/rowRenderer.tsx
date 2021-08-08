import { ReactNode, useContext } from 'react';
import * as React from 'react';
import { BaseTableProps } from 'react-base-table';

import { SimpleTrack } from '../../../../generated/graphql';
import { PlaylistConfigContext } from '../../../context/playlistConfig.context';
import { useHoveredRowState } from '../../../hooks/state/useHoveredRowState';
import { PlaylistTrack } from '../../../hooks/state/usePlaylistsState/types';
import { tupleIdFromPlaylistTrack } from '../../../hooks/state/usePlaylistsState/util';
import { useSelectionHandlers } from '../../../hooks/state/useSelectionHandlers';
import { useSelectionState } from '../../../hooks/state/useSelectionState';
import { useYoutubePlayerState } from '../../../hooks/state/useYoutubePlayerState';
import PlayableRow from '../../PlayableRow';
import DraggableTrack from '../../Playlist/DraggableTrack';

const rowRenderer: BaseTableProps<PlaylistTrack>['rowRenderer'] = ({
  cells,
  rowData,
  rowIndex,
}) => <CustomRow cells={cells} rowData={rowData} rowIndex={rowIndex} />;

interface Props {
  cells: Array<ReactNode>;
  rowData: PlaylistTrack;
  rowIndex: number;
}

const CustomRow = ({ cells, rowData, rowIndex }: Props) => {
  // const { trackStatus, play } = useYoutubePlayerState();
  // const { listeners } = useHoveredRowState(rowIndex);
  // const { isSelected } = useSelectionHandlers(rowData.localSongId);
  //
  // const status = trackStatus(rowData);
  //
  // return (
  //   <PlayableRow
  //     {...listeners}
  //     selected={isSelected()}
  //     onDoubleClick={() => play(tupleIdFromPlaylistTrack(rowData))}
  //     status={status}
  //   >
  //     {cells}
  //   </PlayableRow>
  // );
  return <DraggableTrack cells={cells} rowData={rowData} rowIndex={rowIndex} />;

};

export default rowRenderer;
