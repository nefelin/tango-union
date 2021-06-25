import { useReactiveVar } from '@apollo/client';
import type { ReactNode } from 'react';
import * as React from 'react';
import type { BaseTableProps } from 'react-base-table';
import styled from 'styled-components';

import type { SimpleTrack } from '../../../../generated/graphql';
import { reactiveYoutubePlayerState } from '../../YoutubePlayer/youtubePlayer.state';

const rowRenderer: BaseTableProps<SimpleTrack>['rowRenderer'] = ({
  cells,
  rowData,
}) => <CustomRow cells={cells} rowData={rowData} />;

interface Props {
  cells: Array<ReactNode>;
  rowData: SimpleTrack;
}

const CustomRow = ({ cells, rowData }: Props) => {
  const { trackId, playState } = useReactiveVar(reactiveYoutubePlayerState);
  let status: 'active' | 'playing' | undefined;
  const active = rowData.id === trackId

  if (active) {
    if (playState === 'playing') {
      status = 'playing'
    } else {
      status = 'active'
    }
  }
  return <StyledRow status={status}>{cells}</StyledRow>;
};

const activeColor = 'rgb(240, 240, 240)';
const playingColor = 'rgb(230, 230, 230)';
const StyledRow = styled.div<{ status?: 'active' | 'playing' }>`
  display: flex;
  background-color: ${({ status }) =>
    status === 'active' ? activeColor : 'inherit'}; // fixme theme colors
  height: 100%;
  width: 100%;
  transition: background-color ${({ status }) => (status === 'active' ? '1s' : '400ms')};
  ${({ status }) =>
    status === 'playing'
      ? `
    animation-name: color;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;`
      : ''}

  @keyframes color {
    0% {
      background-color: ${activeColor};
    }
    50% {
      background-color: ${playingColor};
    }
    100% {
      background-color: ${activeColor};
    }
  }
`;

export default rowRenderer;
