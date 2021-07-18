import * as React from 'react';
import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';

import { useTrackDetailsBatchQuery } from '../../generated/graphql';
import { useGlobalPlaylistsState } from '../hooks/state/useGlobalPlaylistState';
import { useYoutubePlayerState } from '../hooks/state/useYoutubePlayerState';
import { Maybe } from '../types/utility/maybe';
import {
  VideoDescriptionContainer,
  VideoDescriptionDatum,
  VideoDescriptionLabel,
  YoutubeContainer,
} from './YoutubePlayer/styles';
import { opts } from './YoutubePlayer/util';

const YoutubePlayer = () => {
  const { youtubePlayerState, play, stop, resume, pause } =
    useYoutubePlayerState();
  const {
    context: { nextTrack },
  } = useGlobalPlaylistsState();
  const [player, setPlayer] = useState<Maybe<YouTubePlayer>>(null);

  const { trackId, playState } = youtubePlayerState;

  const { data } = useTrackDetailsBatchQuery({
    variables: { ids: [trackId?.[0] ?? ''] }, // should never execute with empty string due to skip, will error
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
    resume();
  };

  const handleEnd = () => {
    if (nextTrack) {
      play(nextTrack);
    } else {
      stop();
    }
  };

  const handlePause = () => {
    if (playState !== 'loading') {
      pause();
    }
  };

  const { videoId, description, title } = data?.tracksByIds[0]?.link ?? {};
  return (
    <YoutubeContainer>
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
    </YoutubeContainer>
  );
};

export default YoutubePlayer;
