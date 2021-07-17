import { useApolloClient, useReactiveVar } from '@apollo/client';
import { Paper } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';

import {
  SimpleTrack,
  TrackDetailFragmentFragmentDoc,
} from '../../generated/graphql';
import { useYoutubePlayerState } from '../hooks/state/useYoutubePlayerState';
import TrackDetails from './PlayingNow/TrackDetails';
import Playlists from './Playlists';
import YoutubePlayer from './YoutubePlayer';
import YoutubePlaylistLink from './YoutubePlaylistLink';

const NowPlaying = () => {
  const client = useApolloClient();
  const {
    youtubePlayerState: { trackId },
  } = useYoutubePlayerState();

  const track = client.readFragment<SimpleTrack>({
    id: `SimpleTrack:${trackId?.[0]}`,
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
      <YoutubePlaylistLink />
    </NowPlayingCard>
  );
};

const DetailsRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const NowPlayingCard = styled(Paper)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 20px;
  box-sizing: border-box;
`;

export default NowPlaying;
