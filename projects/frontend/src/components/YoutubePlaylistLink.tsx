import * as React from 'react';
import styled from 'styled-components';

import { useTrackDetailsBatchQuery } from '../../generated/graphql';
import { useRouterTrackList } from './ResultsTable/ResultsTableBody/cellRenderers/actionCell';

const YoutubePlaylistLink = () => {
  const { tracks: ids } = useRouterTrackList('/player');

  const { data } = useTrackDetailsBatchQuery({
    variables: { ids },
    skip: ids.length === 0,
  });

  const videoIds =
    data?.tracksByIds
      .map((track) => track.link?.videoId ?? null)
      .map((x) => x !== null) ?? [];
  const youtubeLink = `http://www.youtube.com/watch_videos?video_ids=${videoIds.join(
    ',',
  )}`;

  return videoIds.length ? (
    <YoutubePlaylistLinkStyled href={youtubeLink} target="_blank">
      Play as Youtube Playlist
    </YoutubePlaylistLinkStyled>
  ) : null;
};

const YoutubePlaylistLinkStyled = styled.a`
  font-size: 12px;
  margin-top: 10px;
`;

export default YoutubePlaylistLink;
