import { useReactiveVar } from '@apollo/client';
import {
  PauseCircleOutline,
  PlayCircleFilledWhiteOutlined,
} from '@material-ui/icons';
import React, { useEffect } from 'react';

import {
  playerStop,
  playTrackId,
  reactiveYoutubePlayerState,
  useTrackStatus,
} from '../../../YoutubePlayer/youtubePlayer.state';
import { useRowIsHovered } from '../../ResultsTableBody';
import { Loader } from '../overlayRenderer/styled';
import { StyledFakeButton } from './styles';
import { CellProps } from './types';

const PlayCell = ({ song, rowIndex }: CellProps) => {
  const { playState } = useReactiveVar(reactiveYoutubePlayerState);
  const { active, playing } = useTrackStatus(song.id, 'search');

  const DefaultIcon = <ConditionalPlayButton rowIndex={rowIndex} />; // fixme hide when not hovering

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

  const Icon = () => (active ? IconFromPlayState() : DefaultIcon);
  const action = () =>
    playing ? playerStop() : playTrackId(song.id, 'search');

  return (
    <StyledFakeButton onClick={action}>
      <Icon />
    </StyledFakeButton>
  );
};

const ConditionalPlayButton = ({ rowIndex }: { rowIndex: number }) => {
  const hovered = useRowIsHovered({ rowIndex, tableName: 'search' });
  return hovered ? <PlayCircleFilledWhiteOutlined /> : null;
};

export default PlayCell;
