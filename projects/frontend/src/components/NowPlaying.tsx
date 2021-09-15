import { useApolloClient } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';

import {
  SimpleTrack,
  TrackDetailFragmentFragmentDoc,
} from '../../generated/graphql';
import { PlaylistConfigContext } from '../context/playlistConfig.context';
import { QUICKLIST_PLAYLIST_ID } from '../hooks/state/useGlobalPlaylistState/songLists.state';
import { useYoutubePlayerState } from '../hooks/state/useYoutubePlayerState';
import TrackDetails from './PlayingNow/TrackDetails';
import Playlists from './Playlists';
import YoutubePlayer from './YoutubePlayer';

const NowPlaying = () => {
  const client = useApolloClient();
  const {
    youtubePlayerState: { activeTrack },
  } = useYoutubePlayerState();

  const track = client.readFragment<SimpleTrack>({
    id: `SimpleTrack:${activeTrack?.trackId}`,
    fragment: TrackDetailFragmentFragmentDoc,
  });

  // fixme fix alignment sizing, etc
  return (
    <NowPlayingCard>
      <DetailsRow>
        <YoutubePlayer />
        <TrackDetails track={track} />
      </DetailsRow>
      <PlaylistConfigContext.Provider
        value={{ name: QUICKLIST_PLAYLIST_ID }}
      >
        <Playlists />
      </PlaylistConfigContext.Provider>
    </NowPlayingCard>
  );
};

const DetailsRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const NowPlayingCard = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  box-sizing: border-box;
`;

export default NowPlaying;
