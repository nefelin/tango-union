import { ReactNode, useContext } from 'react';
import * as React from 'react';
import { BaseTableProps } from 'react-base-table';

import { SimpleTrack } from '../../../../generated/graphql';
import { PlaylistConfigContext } from '../../../context/playlistConfig.context';
import { useYoutubePlayerState } from '../../../hooks/state/useYoutubePlayerState';
import { useHoveredRow } from '../../../state/hoveredRow.state';
import PlayableRow from '../../PlayableRow';
import { useSelection } from '../../Playlist/DraggableTrack';

const rowRenderer: BaseTableProps<SimpleTrack>['rowRenderer'] = ({
  cells,
  rowData,
  rowIndex,
}) => <CustomRow cells={cells} rowData={rowData} rowIndex={rowIndex} />;

interface Props {
  cells: Array<ReactNode>;
  rowData: SimpleTrack;
  rowIndex: number;
}

const CustomRow = ({ cells, rowData, rowIndex }: Props) => {
  const { name: playlistName } = useContext(PlaylistConfigContext);
  const { trackStatus, play } = useYoutubePlayerState();
  const { setHoveredRow, clearHoveredRow } = useHoveredRow();
  const { isSelected } = useSelection(rowData.id.toString());

  const status = trackStatus(rowData.id, playlistName);

  return (
    <PlayableRow
      onMouseEnter={() => setHoveredRow({ rowIndex, tableName: playlistName })}
      onMouseLeave={() => clearHoveredRow()}
      selected={isSelected()}
      onDoubleClick={() => play(rowData.id, playlistName)}
      status={status}
    >
      {cells}
    </PlayableRow>
  );
};

export default rowRenderer;
