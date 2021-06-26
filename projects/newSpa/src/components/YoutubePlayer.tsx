import { useReactiveVar } from '@apollo/client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';

import { useTrackLinksQuery } from '../../generated/graphql';
import { Maybe } from '../types';
import { useResultsPlayingContext } from './ResultsTable/resultsTable.state';
import useCacheStitchedIdFetch from './ResultsTable/useCacheStitchedIdFetch';
import {
  VideoDescriptionContainer,
  VideoDescriptionDatum,
  VideoDescriptionLabel,
  YoutubeContainer,
} from './YoutubePlayer/styles';
import { opts } from './YoutubePlayer/util';
import {
  playerPause,
  playerPlay,
  playerStop,
  playTrackId,
  reactiveYoutubePlayerState,
} from './YoutubePlayer/youtubePlayer.state';

const YoutubePlayer = () => {
  const { trackId, playState, playFocus } = useReactiveVar(
    reactiveYoutubePlayerState,
  );
  const { nextTrackId } = useResultsPlayingContext();
  const [hydrated] = useCacheStitchedIdFetch(
    nextTrackId ? [nextTrackId] : [],
  );
  const nextTrack = hydrated[0];
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
    if (nextTrack?.id) {
      playTrackId(nextTrack.id, playFocus);
    } else {
      playerStop();
    }
  };

  const handlePause = () => {
    if (playState !== 'loading') {
      playerPause();
    }
  };

  const { videoId, description, title } = data?.trackSource[0] ?? {};
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
    </YoutubeContainer>
  );
};

export default YoutubePlayer;
