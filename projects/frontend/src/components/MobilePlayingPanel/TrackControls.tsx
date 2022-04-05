import {
  FastForward,
  FastRewind,
  PauseCircleOutlined,
  PlayCircleOutlined,
} from '@mui/icons-material';
import { CircularProgress, IconButton } from '@mui/material';
import React from 'react';

import { useGlobalPlaylistsState } from '../../hooks/state/useGlobalPlaylistState';
import { useYoutubePlayerState } from '../../hooks/state/useYoutubePlayerState';
import { Loader } from '../ResultsTable/ResultsTableBody/overlayRenderer/styled';

const TrackControls = () => {
  const {
    youtubePlayerState: { playState },
    play,
    stop,
    resume,
    pause,
  } = useYoutubePlayerState();
  const {
    context: { nextTrack, currentTrack, previousTrack },
  } = useGlobalPlaylistsState();

  const handleMain = () => {
    if (playState === 'stopped') {
      resume();
    } else {
      pause();
    }
  };

  const handleRewind = () => previousTrack && play(previousTrack);
  const handleFastForward = () => nextTrack && play(nextTrack);

  let mainIcon = (
    <PlayCircleOutlined className="scale-150" fontSize={'large'} />
  );

  if (playState === 'loading') {
    mainIcon = <CircularProgress sx={{color: 'black'}}  className="scale-150" color={'inherit'} />;
  }

  if (playState === 'playing') {
    mainIcon = <PauseCircleOutlined className="scale-150" fontSize={'large'} />;
  }

  return (
    <div className="flex justify-around w-2/3">
      <IconButton sx={{color: 'black'}}  onClick={handleRewind}>
        <FastRewind fontSize={'large'} />
      </IconButton>
      <IconButton sx={{color: 'black'}}  disabled={playState === 'loading'} onClick={handleMain}>
        {mainIcon}
      </IconButton>
      <IconButton sx={{color: 'black'}} onClick={handleFastForward}>
        <FastForward fontSize={'large'} />
      </IconButton>
    </div>
  );
};
export default TrackControls;
