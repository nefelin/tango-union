import {
  PauseCircleOutline,
  PlayCircleFilledWhiteOutlined,
  VolumeMute,
  VolumeUp,
} from '@material-ui/icons';
import React from 'react';

import { useHoveredRowState } from '../../../../hooks/state/useHoveredRowState';
import { PlaylistTrack } from '../../../../hooks/state/usePlaylistsState/types';
import { useYoutubePlayerState } from '../../../../hooks/state/useYoutubePlayerState';
import { compressTrack } from '../../../../types/CompactTrack';
import { Loader } from '../overlayRenderer/styled';
import { StyledFakeButton } from './styles';
import { CellProps } from './types';

const PlayCell = ({ song, rowIndex }: CellProps) => {
  const {
    youtubePlayerState: { playState },
    trackStatus,
  } = useYoutubePlayerState();
  const { active } = trackStatus(song);

  const showLoading = playState === 'loading' && active;
  return showLoading ? (
    <Loader small color="black" />
  ) : (
    <DynamicPlayButton
      rowIndex={rowIndex}
      track={song}
    />
  );
};

const DynamicPlayButton = ({
  rowIndex,
  track,
}: {
  rowIndex: number;
  track: PlaylistTrack;
}) => {
  const { play, stop } = useYoutubePlayerState();
  const { trackStatus } = useYoutubePlayerState();
  const { hovered } = useHoveredRowState(rowIndex);

  const { active, playing } = trackStatus(track);
  const action = () => (playing ? stop() : play(compressTrack(track)));

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
