import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import YouTube, { Options } from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';

import { useTrackDetailsBatchQuery } from '../../generated/graphql';
import { useGlobalPlaylistsState } from '../hooks/state/useGlobalPlaylistState';
import { useYoutubePlayerState } from '../hooks/state/useYoutubePlayerState';
import { Maybe } from '../types/utility/maybe';
import { YoutubeContainer } from './YoutubePlayer/styles';
import { opts } from './YoutubePlayer/util';

interface Props {
  width?: string;
  height?: string;
}

const YoutubePlayer = ({ width, height }: Props) => {
  const optsWithProps: Options = {
    ...opts(false),
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  };

  const { youtubePlayerState, play, stop, resume, pause } =
    useYoutubePlayerState();
  const {
    context: { nextTrack },
  } = useGlobalPlaylistsState();
  const [player, setPlayer] = useState<Maybe<YouTubePlayer>>(null);

  const { activeTrack, playState } = youtubePlayerState;

  const { data } = useTrackDetailsBatchQuery({
    variables: { ids: [activeTrack?.trackId ?? ''] }, // should never execute with empty string due to skip, will error
    skip: activeTrack === null,
  });
  const { videoId } = data?.tracksByIds[0]?.link ?? {};

  useEffect(() => {
    switch (playState) {
      case 'stopped':
        player?.pauseVideo();
        break;
      case 'playing':
        player?.playVideo();
        break;
      case 'loading':
        player?.playVideo();
        break;
      default:
        break;
    }
  }, [playState, player]);

  const handlePlay = () => {
    resume();
  };

  const handleEnd = () => {
    if (nextTrack) {
      play(nextTrack);
    } else {
      stop();
    }
  };

  const handleStateChange = (stateCode: number) => {
    // fixme this can probably replace other handlers
    // state codes https://developers.google.com/youtube/iframe_api_reference#Playback_status
    switch (stateCode) {
      case 5: // cued
        if (playState === 'loading' || playState === 'playing') {
          player?.playVideo();
        }
        break;
      default:
    }
  };

  const handlePause = () => {
    if (playState !== 'loading') {
      pause();
    }
  };
  // || '-pHhb4biR9k'}
  return (
    <YoutubeContainer>
      <YouTube
        onReady={(e) => {
          setPlayer(e.target);
        }}
        onStateChange={({ data: stateCode }) => handleStateChange(stateCode)}
        onPause={handlePause}
        onEnd={handleEnd}
        onPlay={handlePlay}
        videoId={videoId}
        opts={optsWithProps}
      />
    </YoutubeContainer>
  );
};

export default YoutubePlayer;
