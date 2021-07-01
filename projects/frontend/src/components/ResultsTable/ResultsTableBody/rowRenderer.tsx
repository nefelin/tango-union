import { ReactNode } from 'react';
import * as React from 'react';
import { BaseTableProps } from 'react-base-table';

import { SimpleTrack } from '../../../../generated/graphql';
import PlayableRow from '../../PlayableRow';
import { useSelectedTracks } from '../../Playlist/DraggableTrack';
import {
  playTrackId,
  useTrackStatus,
} from '../../YoutubePlayer/youtubePlayer.state';

const rowRenderer: BaseTableProps<SimpleTrack>['rowRenderer'] = ({
  cells,
  rowData,
}) => <CustomRow cells={cells} rowData={rowData} />;

interface Props {
  cells: Array<ReactNode>;
  rowData: SimpleTrack;
}

const CustomRow = ({ cells, rowData }: Props) => {
  const status = useTrackStatus(rowData.id, 'search');
  const { isSelected } = useSelectedTracks();
  const selected = isSelected(rowData.id.toString());
  return (
    <PlayableRow
      selected={selected}
      onDoubleClick={() => playTrackId(rowData.id, 'search')}
      status={status}
    >
      {cells}
    </PlayableRow>
  );
};

export default rowRenderer;
