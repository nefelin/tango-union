import { useReactiveVar } from '@apollo/client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';

import { useTrackDetailsBatchQuery } from '../../generated/graphql';
import { useYoutubePlayerState } from '../hooks/state/useYoutubePlayerState';
import { Maybe } from '../types/maybe';
import { useResultsPlayingContext } from './ResultsTable/resultsTable.state';
import useCacheStitchedIdFetch from './ResultsTable/useCacheStitchedIdFetch';
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
  const { nextTrackId } = useResultsPlayingContext();
  const [hydrated] = useCacheStitchedIdFetch(nextTrackId ? [nextTrackId] : []);
  const nextTrack = hydrated[0];
  const [player, setPlayer] = useState<Maybe<YouTubePlayer>>(null);

  const { trackId, playState, playFocus } = youtubePlayerState;

  const { data } = useTrackDetailsBatchQuery({
    variables: { ids: [trackId || 0] },
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
    if (nextTrack?.id) {
      play(nextTrack.id, playFocus);
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
