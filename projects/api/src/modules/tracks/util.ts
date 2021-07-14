// tells mongo these terms should be AND'ed
import { EntityCount, FacetedResults } from './types';
import { CompoundResults } from './dto/compoundResult.entity';
import { TrackDocument } from '../../schemas/tracks.entity';
import { SimpleTrack } from './dto/simpletrack.entity';
import { CompoundSortInput } from './dto/compoundQuery.input';
import { cleanSlop } from '../../util/slop';

export const andifyMongoTextSearch = (text?: string) => {
  if (!text) {
    return text;
  }

  return cleanSlop(text)
    .split(' ')
    .map((word) => `"${word}"`) // tells mongo these terms should be AND'ed
    .join(' ');
};

export const compoundResultsFromFacetedResults = (res: FacetedResults): CompoundResults => {
  const pairsFromCounts = ({ _id: name, count }: EntityCount) => ({
    name,
    count,
  });

  return {
    ids: res.tracks.map(({ id }) => id),
    counts: {
      singer: res.singerCount.map(pairsFromCounts),
      orchestra: res.orchestraCount.map(pairsFromCounts),
      genre: res.genreCount.map(pairsFromCounts),
    },
    totalResults: res.total[0]?.total ?? 0,
  };
};

export const simpleTrackFromTrackDoc = (track: TrackDocument): SimpleTrack => ({
  id: track.id,
  title: track.title,
  orchestra: track.orchestra,
  year: track.year,
  genre: track.genre,
  singer: track.singer,
  secondsLong: track.secondsLong,
  link: track.youtube.links[0],
  linkScore: track.youtube.linkScore,
});

export const cleanSort = (dirtySort: CompoundSortInput) => ({
  ...dirtySort,
  ...(dirtySort.linkScore ? { 'youtube.linkScore': dirtySort.linkScore } : {}),
});
