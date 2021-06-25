import { useReactiveVar } from '@apollo/client';
import { Paper } from '@material-ui/core';
import * as React from 'react';
import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import type { YouTubePlayer } from 'youtube-player/dist/types';

import { useTrackLinksQuery } from '../../generated/graphql';
import type { Maybe } from '../types';
import {
  VideoDescriptionContainer,
  VideoDescriptionDatum,
  VideoDescriptionLabel,
} from './YoutubePlayer/styled';
import { opts } from './YoutubePlayer/util';
import {
  playerPause,
  playerPlay,
  playerStop,
  reactiveYoutubePlayerState,
} from './YoutubePlayer/youtubePlayer.state';

const YoutubePlayer = () => {
  const { trackId, playState } = useReactiveVar(reactiveYoutubePlayerState);
  const [player, setPlayer] = useState<Maybe<YouTubePlayer>>(null);

  const { data } = useTrackLinksQuery({
    variables: { trackId: trackId ?? 0 },
    skip: trackId === null,
  });

  useEffect(() => {
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

  const { videoId, description, title } = data?.trackSource[0] ?? {};
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
      {description && (
        <VideoDescriptionContainer>
          <VideoDescriptionDatum>
            <VideoDescriptionLabel>Title: </VideoDescriptionLabel>
            {title}
          </VideoDescriptionDatum>
          <VideoDescriptionDatum>
            <VideoDescriptionLabel>Description: </VideoDescriptionLabel>
            {description}
          </VideoDescriptionDatum>
        </VideoDescriptionContainer>
      )}
    </>
  );
};

export default YoutubePlayer;
