import {
  FormatListBulletedOutlined,
  PlayCircleFilledWhiteOutlined,
  SearchOutlined,
} from '@material-ui/icons';
import type { FunctionComponent } from 'react';
import React from 'react';
import type { ColumnShape } from 'react-base-table';
import styled from 'styled-components';

import type { SimpleTrack } from '../../../../generated/graphql';
import { timeStringFromSeconds } from './util';

interface CellProps {
  song: SimpleTrack;
}

const StyledFakeButton = styled.div`
  cursor: pointer;
`;

type SongRenderer = FunctionComponent<CellProps>;

export const cellRenderComponent: (
  Comp: SongRenderer,
) => ColumnShape<SimpleTrack>['cellRenderer'] =
  (Comp: SongRenderer) => (data) => {
    const { rowData } = data;
    return <Comp song={rowData} />;
  };

export const ActionCell: SongRenderer = ({ song }: CellProps) => {
  return (
    <StyledFakeButton>
      <SearchOutlined
        onClick={() => alert('should copy some search criteria')}
      />
      <FormatListBulletedOutlined
        onClick={() => alert('should somehow let us pick a source')}
      />
    </StyledFakeButton>
  );
};

export const LengthCell = ({ song }: CellProps) => (
  <span>
    {song.secondsLong ? timeStringFromSeconds(song.secondsLong) : '--'}
  </span>
);

export const ListCell = ({ song }: CellProps) => (
  <span>{song.singer?.join(', ')}</span>
);

export const PlayCell = ({ song }: CellProps) => {
  // const { playing, nowPlayingId, dispatch } = useContext(store);
  //
  // const isPlaying = playing === 'playing' && nowPlayingId === song._id;
  //
  // const action: Action = isPlaying
  //   ? { type: 'pause' }
  //   : { type: 'playFromTrackId', id: song._id };

  const Icon = () => <PlayCircleFilledWhiteOutlined />;

  // const Icon = () =>
  //   isPlaying ? <PauseCircleOutline /> : <PlayCircleFilledWhiteOutlined />;

  return (
    <StyledFakeButton
      onClick={() => {
      }}
    >
      <Icon />
    </StyledFakeButton>
  );
};
