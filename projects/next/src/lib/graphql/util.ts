import * as r from 'ramda';
import { EntityCount, FacetedResults, CompoundResults, PaginationInput, CompoundSortInput } from './types';
import { cleanSlop } from '../util/slop';

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
  pagination: PaginationInput
): CompoundResults => {
  const pairsFromCounts = ({ _id: name, count }: EntityCount) => ({
    name,
    count,
  });

  return {
    ids: (res.tracks || []).map(({ id }) => id.toString()),
    randomId: res.random?.[0]?.id?.toString() ?? '0',
    counts: {
      year: (res.yearCount || []).map(pairsFromCounts),
      singer: (res.singerCount || []).map(pairsFromCounts),
      orchestra: (res.orchestraCount || []).map(pairsFromCounts),
      genre: (res.genreCount || []).map(pairsFromCounts),
    },
    page: pagination.offset / pagination.limit,
    totalPages: Math.ceil((res.total[0]?.total ?? 0) / pagination.limit),
    totalResults: res.total[0]?.total ?? 0,
  };
};

export const cleanSort = (dirtySort: CompoundSortInput) => ({
  ...dirtySort,
  ...(dirtySort.linkScore ? { 'youtube.linkScore': dirtySort.linkScore } : {}),
});

