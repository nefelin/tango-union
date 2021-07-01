import { ReactNode, useState } from 'react';
import * as React from 'react';
import { BaseTableProps } from 'react-base-table';

import { SimpleTrack } from '../../../../generated/graphql';
import PlayableRow from '../../PlayableRow';
import { useSelectedTracks } from '../../Playlist/DraggableTrack';
import {
  playTrackId,
  useTrackStatus,
} from '../../YoutubePlayer/youtubePlayer.state';
import { reactiveRowFocus } from '../ResultsTableBody';

const rowRenderer: BaseTableProps<SimpleTrack>['rowRenderer'] = ({
  cells,
  rowData,
  rowIndex
}) => <CustomRow cells={cells} rowData={rowData} rowIndex={rowIndex} />;

interface Props {
  cells: Array<ReactNode>;
  rowData: SimpleTrack;
  rowIndex: number;
}

const CustomRow = ({ cells, rowData, rowIndex }: Props) => {
  const status = useTrackStatus(rowData.id, 'search');
  const { isSelected } = useSelectedTracks();
  const selected = isSelected(rowData.id.toString());
  return (
    <PlayableRow
      onMouseEnter={() => reactiveRowFocus({rowIndex, tableName: 'search'})}
      selected={selected}
      onDoubleClick={() => playTrackId(rowData.id, 'search')}
      status={status}
    >
      {cells}
    </PlayableRow>
  );
};

export default rowRenderer;
