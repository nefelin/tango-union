import { TrackDetailFragmentFragment } from '../../../generated/graphql';
import { Maybe } from '../../types/utility/maybe';
import yearsSummary from './yearsSummary';

export interface OrchestraSummary {
  orchestras: Array<string>;
  years: Array<string>;
  singer: Array<string>;
  genres: Array<string>;
}

export const summarize = (
  tracks: Array<TrackDetailFragmentFragment>,
): OrchestraSummary => {
  const years: Set<number> = new Set();
  const singers: Set<string> = new Set();
  const orchestras: Set<string> = new Set();
  const genres: Set<string> = new Set();

  for (const track of tracks) {
    if (track.year) {
      years.add(track.year);
    }
    if (track.orchestra) {
      for (const orq of track.orchestra) {
        orchestras.add(orq);
      }
    }
    if (track.singer) {
      for (const sing of track.singer) {
        singers.add(sing);
      }
    }
    if (track.genre) {
      genres.add(track.genre);
    }
  }

  return {
    orchestras: [...orchestras],
    years: yearsSummary([...years]),
    singer: [...singers],
    genres: [...genres],
  };
};

export const summarizeByOrchestra = (
  tracks: Maybe<Array<TrackDetailFragmentFragment>>,
): Array<OrchestraSummary> => {
  const grouped: Record<string, Array<TrackDetailFragmentFragment>> = {};

  for (const track of tracks || []) {
    if (!track.orchestra) {
      continue;
    }
    const orchestraKey = track.orchestra.join(', ');
    grouped[orchestraKey] = [...(grouped[orchestraKey] || []), track];
  }

  return Object.values(grouped).map(summarize);
};
