import { TrackDetailFragmentFragment } from '../../../generated/graphql';
import { Maybe } from '../../types/utility/maybe';
import yearsSummary from './yearsSummary';

export interface PlaylistSummaryInterface {
  orchestras: Array<string>;
  years: Array<string>;
  singers: Array<string>;
  genres: Array<string>;
}

type SummaryCategory = keyof PlaylistSummaryInterface;
export type SmartPlaylistSummary = PlaylistSummaryInterface & {dominantCategory: SummaryCategory}

export const summarize = (
  tracks: Array<TrackDetailFragmentFragment>,
): PlaylistSummaryInterface => {
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
    singers: [...singers],
    genres: [...genres],
  };
};

export const categorizeSummary = (
  summary: PlaylistSummaryInterface,
): SmartPlaylistSummary => {
  let dominantCategory: SummaryCategory = 'orchestras';

  if (summary.orchestras.length === 1) {
    dominantCategory = 'orchestras';
  } else if (summary.singers.length === 1) {
    dominantCategory = 'singers';
  } else if (summary.years.length === 1) {
    dominantCategory = 'years';
  } else if (summary.genres.length === 1) {
    dominantCategory = 'genres';
  }

  return { ...summary, dominantCategory };
};

export const smartSummary = (tracks: Array<TrackDetailFragmentFragment>) => {
  return categorizeSummary(summarize(tracks))
}

export const summarizeByOrchestra = (
  tracks: Maybe<Array<TrackDetailFragmentFragment>>,
): Array<PlaylistSummaryInterface> => {
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
