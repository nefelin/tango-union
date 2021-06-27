import { makeVar, useReactiveVar } from '@apollo/client';

import { SimpleTrack } from '../../../generated/graphql';
import { reactiveYoutubePlayerState } from '../YoutubePlayer/youtubePlayer.state';
import { useRouterTrackList } from './ResultsTableBody/cellRenderers/actionCell';

interface ResultsContext {
  index?: number;
  trackId?: number;
  nextTrackId?: number;
}

export const useResultsPlayingContext = (): ResultsContext => {
  const { trackId, playFocus } = useReactiveVar(reactiveYoutubePlayerState);
  const { tracks: playlistIds } = useRouterTrackList();

  const searchIds = useReactiveVar(reactiveTableResults).map(({ id }) => id);
  const results = playFocus === 'search' ? searchIds : playlistIds;

  if (!trackId) {
    return {};
  }

  const index = results.findIndex((id) => id === trackId);
  const track = results.find((id) => id === trackId);
  const nextTrackId = results[index + 1];

  // console.log({results, playFocus, nextTrackId})

  if (index === -1 || !track) {
    return {};
  }
  return { index, trackId, nextTrackId };
};

export const reactiveTableResults = makeVar<Array<SimpleTrack>>([]);
export const reactiveTableRowsVisible = makeVar<[number, number]>([0, 100]);
