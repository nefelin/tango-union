import { useReactiveVar } from '@apollo/client';
import {
  FormatListBulletedOutlined,
  HelpOutline,
  PauseCircleOutline,
  PlayCircleFilledWhiteOutlined,
  SearchOutlined,
} from '@material-ui/icons';
import type { FunctionComponent } from 'react';
import React from 'react';
// eslint-disable-next-line import/no-duplicates
import type BaseTable from 'react-base-table';
// eslint-disable-next-line import/no-duplicates
import type { ColumnShape } from 'react-base-table';
import styled from 'styled-components';

import type { SimpleTrack } from '../../../../generated/graphql';
import {
  playerStop,
  playTrackId,
  reactiveYoutubePlayerState,
} from '../../YoutubePlayer/youtubePlayer.state';
import { reactiveTableRowsVisible, useResultsPlayingContext } from '../resultsTable.state';
import { Loader } from './overlayRenderer/styled';
import { timeStringFromSeconds } from './util';

interface CellProps {
  song: SimpleTrack;
  column: ColumnShape<SimpleTrack>;
}

const StyledFakeButton = styled.div`
  cursor: pointer;
`;

type SongRenderer = FunctionComponent<CellProps>;

export const cellRenderComponent: (
  Comp: SongRenderer,
) => ColumnShape<SimpleTrack>['cellRenderer'] =
  (Comp: SongRenderer) => (data) => {
    const { rowData, column } = data;
    return <Comp song={rowData} column={column} />;
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

export const ListCell = ({ song, column: { key } }: CellProps) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const value = song[key as keyof CellProps['song']];
  return <span>{Array.isArray(value) ? value?.join(', ') : value}</span>;
};

export const playHeaderRenderer: ColumnShape<SimpleTrack>['headerRenderer'] = ({
  container,
}) => <PlayHeader container={container} />;

const PlayHeader = ({ container }: { container: BaseTable<SimpleTrack> }) => {
  const {index} = useResultsPlayingContext();
  const [firstRow, lastRow] = useReactiveVar(reactiveTableRowsVisible);

  const activeTrackNotVisible = index !== undefined && (index < firstRow || index > lastRow)

  return activeTrackNotVisible ? (
    <StyledFakeButton onClick={() => container.scrollToRow(index)}>
      <HelpOutline />
    </StyledFakeButton>
  ) : (
    <PlayCircleFilledWhiteOutlined />
  );
};

export const PlayCell = ({ song }: CellProps) => {
  const { playState, trackId: playingTrackId } = useReactiveVar(
    reactiveYoutubePlayerState,
  );

  const thisTrackActive = playingTrackId === song.id;
  const DefaultIcon = <PlayCircleFilledWhiteOutlined />;

  const IconFromPlayState = () => {
    switch (playState) {
      case 'loading':
        return <Loader small color="black" />; // fixme switch loader
      case 'playing':
        return <PauseCircleOutline />;
      case 'stopped':
      default:
        return DefaultIcon;
    }
  };

  const Icon = () => (thisTrackActive ? IconFromPlayState() : DefaultIcon);
  const canStop = playState === 'playing' || playState === 'loading';
  const action = () =>
    thisTrackActive && canStop ? playerStop() : playTrackId(song.id);

  return (
    <StyledFakeButton onClick={action}>
      <Icon />
    </StyledFakeButton>
  );
};
