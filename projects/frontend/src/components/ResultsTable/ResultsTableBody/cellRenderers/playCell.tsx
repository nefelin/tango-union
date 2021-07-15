import { useReactiveVar } from '@apollo/client';
import {
  PauseCircleOutline,
  PlayCircleFilledWhiteOutlined,
  VolumeMute,
  VolumeUp,
} from '@material-ui/icons';
import React, { useContext } from 'react';

import { PlaylistConfigContext } from '../../../../context/playlistConfig.context';
import { useYoutubePlayerState } from '../../../../hooks/state/useYoutubePlayerState';
import { useHoveredRow } from '../../../../state/hoveredRow.state';
import { Loader } from '../overlayRenderer/styled';
import { StyledFakeButton } from './styles';
import { CellProps } from './types';

const PlayCell = ({ song, rowIndex }: CellProps) => {
  const { name: playlistName } = useContext(PlaylistConfigContext);
  const {
    youtubePlayerState: { playState },
    trackStatus,
  } = useYoutubePlayerState();
  const { active } = trackStatus(song.id, playlistName);

  const showLoading = playState === 'loading' && active;
  return showLoading ? (
    <Loader small color="black" />
  ) : (
    <DynamicPlayButton rowIndex={rowIndex} id={song.id} />
  );
};

const DynamicPlayButton = ({
  rowIndex,
  id,
}: {
  rowIndex: number;
  id: number;
}) => {
  const { play, stop } = useYoutubePlayerState();
  const { name: playlistName } = useContext(PlaylistConfigContext);
  const { trackStatus } = useYoutubePlayerState();
  const { hovered } = useHoveredRow({
    rowLens: { rowIndex, tableName: playlistName },
  });

  const { active, playing } = trackStatus(id, playlistName);
  const action = () => (playing ? stop() : play(id, playlistName));

  const icon = active
    ? activeRowIcon(hovered, playing)
    : inactiveRowIcon(hovered);

  return <StyledFakeButton onClick={action}>{icon}</StyledFakeButton>;
};

const inactiveRowIcon = (hovered: boolean) =>
  hovered ? <PlayCircleFilledWhiteOutlined /> : null;

const activeRowIcon = (hovered: boolean, playing: boolean): JSX.Element => {
  if (hovered) {
    if (playing) {
      return <PauseCircleOutline />;
    }
    return <PlayCircleFilledWhiteOutlined />;
  }
  if (playing) {
    return <VolumeUp />;
  }
  return <VolumeMute />;
};

export default PlayCell;
