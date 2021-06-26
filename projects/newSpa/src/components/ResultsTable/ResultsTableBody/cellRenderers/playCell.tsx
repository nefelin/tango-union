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
  useTrackStatus,
} from '../../../YoutubePlayer/youtubePlayer.state';
import { Loader } from '../overlayRenderer/styled';
import { StyledFakeButton } from './styles';
import { CellProps } from './types';

const PlayCell = ({ song }: CellProps) => {
  const { playState } = useReactiveVar(
    reactiveYoutubePlayerState,
  );
  const {active, playing } = useTrackStatus(song.id, 'search');

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

  const Icon = () => (active ? IconFromPlayState() : DefaultIcon);
  const action = () =>
    playing ? playerStop() : playTrackId(song.id, 'search');

  return (
    <StyledFakeButton onClick={action}>
      <Icon />
    </StyledFakeButton>
  );
};

export default PlayCell;
