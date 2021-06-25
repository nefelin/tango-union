import { useApolloClient, useReactiveVar } from '@apollo/client';
import { Paper } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';

import type { SimpleTrack } from '../../generated/graphql';
import { TrackDetailFragmentFragmentDoc } from '../../generated/graphql';
import TrackDetails from './PlayingNow/TrackDetails';
import Playlists from './Playlists';
import YoutubePlayer from './YoutubePlayer';
import { reactiveYoutubePlayerState } from './YoutubePlayer/youtubePlayer.state';

const NowPlaying = () => {
  const client = useApolloClient();
  const { trackId } = useReactiveVar(reactiveYoutubePlayerState);

  const track = client.readFragment<SimpleTrack>({
    id: `SimpleTrack:${trackId}`,
    fragment: TrackDetailFragmentFragmentDoc,
  });

  return (
    <NowPlayingCard>
      <YoutubePlayer />
      <TrackDetails track={track} />
      <Playlists />
    </NowPlayingCard>
  );
};

const NowPlayingCard = styled(Paper)`
  margin: 10px;
  padding: 20px;
  box-sizing: border-box;
`;

export default NowPlaying;
