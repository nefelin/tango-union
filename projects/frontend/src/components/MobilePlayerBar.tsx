import { PauseCircleOutlined, PlayCircleOutlined } from '@mui/icons-material';
import { CircularProgress, LinearProgress } from '@mui/material';
import React from 'react';

import { layout } from '../features/MobileDash/layout';
import { useYoutubePlayerState } from '../hooks/state/useYoutubePlayerState';
import { asVh } from '../hooks/useViewport';
import useCacheStitchedIdFetch from './ResultsTable/useCacheStitchedIdFetch';

interface Props {
  onClick: VoidFunction;
}

const MobilePlayerBar = ({ onClick }: Props) => {
  const {
    resume,
    pause,
    youtubePlayerState: { playState },
    currentTrack,
  } = useYoutubePlayerState();
  const [tracks] = useCacheStitchedIdFetch(currentTrack ? [currentTrack] : []);
  const track = tracks?.[0];

  const handlePlayPause = (e) => {
    e.stopPropagation();
    if (playState === 'playing') {
      pause();
    } else if (playState === 'stopped') {
      resume();
    }
  };

  if (!track) {
    return null;
  }

  let actionIcon = (
    <PlayCircleOutlined onClick={handlePlayPause} className="scale-150" />
  );

  // if (playState === 'loading') { // todo I like this but the sizing needs to match the buttons better
  //   actionIcon = (
  //     <CircularProgress
  //       sx={{ color: 'black', width: 50}}
  //       color={'inherit'}
  //     />
  //   );
  // }

  if (playState === 'playing') {
    actionIcon = (
      <PauseCircleOutlined onClick={handlePlayPause} className="scale-150" />
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      onClick={onClick}
      className="fixed w-full flex flex-row justify-between items-center bg-grey-300 py-1 px-4"
      style={{
        boxShadow: '0 0 10px rgba(0, 0, 0, .15)',
        height: asVh(layout.playerBar),
        bottom: asVh(layout.navbar),
        borderBottom: '1px solid #e1e1e1',
        // background:
        //   'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,239,254,1) 36%, rgba(255,239,254,1) 100%)',
      }}
    >
      <div className="flex">
        {track.link?.videoId && (
          <img
            className="h-10 w-10 mr-4 rounded-md"
            alt="youtube video thumbnail"
            src={thumbFromId(track.link.videoId)}
          />
        )}
        <div className="flex flex-col">
          <div className="text-sm font-bold truncate">{`${track.title}`}</div>
          <div className="text-xs truncate italic">{`${track.orchestra?.join(
            ', ',
          )} - ${track.singer?.join(', ')}`}</div>
        </div>
      </div>
      {actionIcon}
    </div>
  );
};

const thumbFromId = (videoId: string) =>
  `https://img.youtube.com/vi/${videoId}/0.jpg`;

export default MobilePlayerBar;
