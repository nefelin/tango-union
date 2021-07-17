import { ReactNode, useContext } from 'react';
import * as React from 'react';
import { BaseTableProps } from 'react-base-table';

import { SimpleTrack } from '../../../../generated/graphql';
import { PlaylistConfigContext } from '../../../context/playlistConfig.context';
import { useHoveredRowState } from '../../../hooks/state/useHoveredRowState';
import { PlaylistTrack } from '../../../hooks/state/usePlaylistsState/types';
import { tupleIdFromPlaylistTrack } from '../../../hooks/state/usePlaylistsState/util';
import { useYoutubePlayerState } from '../../../hooks/state/useYoutubePlayerState';
import PlayableRow from '../../PlayableRow';
import { useSelection } from '../../Playlist/DraggableTrack';

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
  const { name: playlistName } = useContext(PlaylistConfigContext);
  const { trackStatus, play } = useYoutubePlayerState();
  const { setHoveredRow, clearHoveredRow } = useHoveredRowState();
  const { isSelected } = useSelection(rowData.id.toString());

  const status = trackStatus(rowData);

  return (
    <PlayableRow
      onMouseEnter={() => setHoveredRow({ rowIndex, tableName: playlistName })}
      onMouseLeave={() => clearHoveredRow()}
      selected={isSelected()}
      onDoubleClick={() => play(tupleIdFromPlaylistTrack(rowData))}
      status={status}
    >
      {cells}
    </PlayableRow>
  );
};

export default rowRenderer;
