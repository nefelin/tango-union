import { useReactiveVar } from '@apollo/client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import type { Options } from 'react-youtube';
import YouTube from 'react-youtube';
import type { YouTubePlayer } from 'youtube-player/dist/types';

// import type { YouTubePlayer } from 'youtube-player/dist/types';
import { useTrackLinksQuery } from '../../generated/graphql';
import type { Maybe } from '../types';
import {
  playerPause,
  playerPlay,
  playerStop,
  reactiveYoutubePlayerState,
} from './YoutubePlayer/youtubePlayer.state';

const API_MINIMUMS = {
  height: 70,
  width: 120,
};

const opts = (autoplay?: boolean): Options => ({
  height: `${API_MINIMUMS.height * 2.5}px`,
  width: `${API_MINIMUMS.width * 2.5}px`,
  playerVars: {
    autoplay: autoplay ? 1 : 0,
  },
});

const YoutubePlayer = () => {
  const { trackId, playState } = useReactiveVar(reactiveYoutubePlayerState);
  const [player, setPlayer] = useState<Maybe<YouTubePlayer>>(null);

  const { data, loading, error } = useTrackLinksQuery({
    variables: { trackId: trackId ?? 0 },
    skip: trackId === null,
  });

  useEffect(() => {
    console.log(player);
    switch (playState) {
      case 'stopped':
        player?.pauseVideo();
        break;
      case 'playing':
        player?.playVideo();
        break;
      default:
        break;
    }
  }, [playState, player]);

  const videoId = data?.trackSource[0]?.videoId;

  const handlePlay = () => {
    playerPlay();
  };
  const handleEnd = () => {
    playerStop();
  };
  const handlePause = () => {
    if (playState !== 'loading') {
      playerPause();
    }
  };

  return (
    <>
    <YouTube
      onReady={(e) => {
        setPlayer(e.target);
      }}
      onPause={handlePause}
      onEnd={handleEnd}
      onPlay={handlePlay}
      videoId={videoId}
      opts={opts(true)}
    />
      {data?.trackSource[0]?.description}
      </>
  );
};

export default YoutubePlayer;
