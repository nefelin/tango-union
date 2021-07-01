import { ReactNode } from 'react';
import * as React from 'react';
import { BaseTableProps } from 'react-base-table';

import { SimpleTrack } from '../../../../generated/graphql';
import PlayableRow from '../../PlayableRow';
import {
  playTrackId,
  reactiveYoutubePlayerState,
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
  return (
    <PlayableRow
      onDoubleClick={() => playTrackId(rowData.id, 'search')}
      status={status}
    >
      {cells}
    </PlayableRow>
  );
};

export default rowRenderer;
