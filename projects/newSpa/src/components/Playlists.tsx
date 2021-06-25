import { useReactiveVar } from '@apollo/client';
import { Paper } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';

import { reactiveYoutubePlayerState } from './YoutubePlayer/youtubePlayer.state';

const Playlists = () => {
  const { trackId } = useReactiveVar(reactiveYoutubePlayerState);
  return (
    trackId !== null ? <PlaylistContainer>Playlists Coming Soon!</PlaylistContainer> : null
  );
};

const PlaylistContainer = styled(Paper)`
  box-sizing: border-box;
  margin-top: 10px;
  padding: 20px;
  height: 200px;
`;

export default Playlists;
