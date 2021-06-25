import { makeVar, useReactiveVar } from '@apollo/client';

import type { SimpleTrack } from '../../../generated/graphql';
import { reactiveYoutubePlayerState } from '../YoutubePlayer/youtubePlayer.state';

interface ResultsContext {
  index?: number;
  track?: SimpleTrack;
  nextTrack?: SimpleTrack;
}

export const useResultsPlayingContext = (): ResultsContext => {
  const { trackId } = useReactiveVar(reactiveYoutubePlayerState);
  const results = useReactiveVar(reactiveTableResults);

  if (!trackId) {
    return {};
  }

  const index = results.findIndex(({ id }) => id === trackId);
  const track = results.find(({ id }) => id === trackId);
  const nextTrack = results[index + 1];

  if (index === -1 || !track) {
    return {};
  }
  return { index, track, nextTrack };
};

export const reactiveTableResults = makeVar<Array<SimpleTrack>>([]);
export const reactiveTableRowsVisible = makeVar<[number, number]>([0, 100]);
