import { useApolloClient, useReactiveVar } from '@apollo/client';
import { Paper } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';

import {
  SimpleTrack,
  TrackDetailFragmentFragmentDoc,
} from '../../generated/graphql';
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

  // fixme fix alignment sizing, etc
  return (
    <NowPlayingCard>
      <DetailsRow>
        <YoutubePlayer />
        <TrackDetails track={track} />
      </DetailsRow>
      <Playlists />
    </NowPlayingCard>
  );
};

const DetailsRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const NowPlayingCard = styled(Paper)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 20px;
  box-sizing: border-box;
  height: 600px;
`;

export default NowPlaying;
