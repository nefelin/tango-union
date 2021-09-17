// tells mongo these terms should be AND'ed
import { EntityCount, FacetedResults } from './types';
import { CompoundResults } from './dto/compoundResult.entity';
import { TrackDocument } from '../../schemas/tracks.entity';
import { SimpleTrack } from './dto/simpletrack.entity';
import { CompoundSortInput, PaginationInput } from './dto/compoundQuery.input';
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

export const compoundResultsFromFacetedResults = (
  res: FacetedResults,
  pagination: PaginationInput,
): CompoundResults => {
  const pairsFromCounts = ({ _id: name, count }: EntityCount) => ({
    name,
    count,
  });

  return {
    ids: res.tracks.map(({ id }) => id.toString()),
    counts: {
      year: res.yearCount.map(pairsFromCounts),
      singer: res.singerCount.map(pairsFromCounts),
      orchestra: res.orchestraCount.map(pairsFromCounts),
      genre: res.genreCount.map(pairsFromCounts),
    },
    page: pagination.offset / pagination.limit,
    totalPages: Math.ceil((res.total[0]?.total ?? 0) / pagination.limit),
    totalResults: res.total[0]?.total ?? 0,
  };
};

export const simpleTrackFromTrackDoc = (track: TrackDocument): SimpleTrack => ({
  id: track.id.toString(),
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
