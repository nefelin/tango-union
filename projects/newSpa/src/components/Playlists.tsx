import { useReactiveVar } from '@apollo/client';
import { Paper } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';

import { useRouterTrackList } from './ResultsTable/ResultsTableBody/cellRenderers/actionCell';
import useCacheStitchedIdFetch from './ResultsTable/useCacheStitchedIdFetch';
import { reactiveYoutubePlayerState } from './YoutubePlayer/youtubePlayer.state';

const Playlists = () => {
  const { trackId } = useReactiveVar(reactiveYoutubePlayerState);
  const { tracks: ids } = useRouterTrackList('/player');
  const [tracks] = useCacheStitchedIdFetch(ids, false);

  return trackId !== null ? (
    <PlaylistContainer>
      {tracks.map((track) => (
        <div key={track.id}>{track?.title}</div>
      ))}
    </PlaylistContainer>
  ) : null;
};

const PlaylistContainer = styled(Paper)`
  box-sizing: border-box;
  margin-top: 10px;
  padding: 20px;
  height: 200px;
`;

export default Playlists;
