import { useReactiveVar } from '@apollo/client';
import type { ReactNode } from 'react';
import * as React from 'react';
import type { BaseTableProps } from 'react-base-table';
import styled from 'styled-components';

import type { SimpleTrack } from '../../../../generated/graphql';
import { reactiveYoutubePlayerState, useTrackStatus } from '../../YoutubePlayer/youtubePlayer.state';
import PlayableRow from '../../PlayableRow';

const rowRenderer: BaseTableProps<SimpleTrack>['rowRenderer'] = ({
  cells,
  rowData,
}) => <CustomRow cells={cells} rowData={rowData} />;

interface Props {
  cells: Array<ReactNode>;
  rowData: SimpleTrack;
}

const CustomRow = ({ cells, rowData }: Props) => {
  const status = useTrackStatus(rowData.id, 'search')
  return <PlayableRow status={status}>{cells}</PlayableRow>;
};

export default rowRenderer;
