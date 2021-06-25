import { useReactiveVar } from '@apollo/client';
import {
  PauseCircleOutline,
  PlayCircleFilledWhiteOutlined,
} from '@material-ui/icons';
import React from 'react';

import {
  playerStop,
  playTrackId,
  reactiveYoutubePlayerState,
} from '../../../YoutubePlayer/youtubePlayer.state';
import { Loader } from '../overlayRenderer/styled';
import { StyledFakeButton } from './styles';
import type { CellProps } from './types';

const PlayCell = ({ song }: CellProps) => {
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

export default PlayCell;