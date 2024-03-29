import { ExpandMore } from '@mui/icons-material';
import { CircularProgress, MenuItem } from '@mui/material';
import React from 'react';

import { useRoutedState } from '../hooks/state/useRoutedState';
import { useYoutubePlayerState } from '../hooks/state/useYoutubePlayerState';
import LinkQualityWarning from '../LinkQualityWarning';
import TrackControls from './MobilePlayingPanel/TrackControls';
import useCacheStitchedIdFetch from './ResultsTable/useCacheStitchedIdFetch';
import YoutubePlayer from './YoutubePlayer';

const MobilePlayingPanel = () => {
  const { currentTrack } = useYoutubePlayerState();
  const { setPanelPlayer } = useRoutedState();

  const [tracks] = useCacheStitchedIdFetch(currentTrack ? [currentTrack] : []);
  const track = tracks?.[0];

  if (!track) {
    return (
      <div className="flex flex-col justify-center items-center text-lg font-bold w-full h-full bg-white">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="bg-white h-full flex flex-col w-full">
      <MenuItem onClick={() => setPanelPlayer({ player: false })}>
        <ExpandMore />
      </MenuItem>
      <div className="flex flex-col p-4 items-center justify-around h-[inherit] bg-white">
        <YoutubePlayer width="200px" height="200px" />
        {track && (
          <div className="flex flex-col items-center">
            <div className="text-lg font-bold">{`${track.title} - ${track.year}`}</div>
            <div className="text-sm">{track.orchestra?.join(', ')}</div>
            <div className="text-sm">{track.singer?.join(', ')}</div>
          </div>
        )}
        <LinkQualityWarning track={track} />
        <TrackControls />
      </div>
    </div>
  );
};

export default MobilePlayingPanel;
