// tells mongo these terms should be AND'ed
import { EntityCount, FacetedResults } from './types';
import { CompoundResults } from './dto/compoundResult.entity';

export const andifyMongoTextSearch = (text?: string) => {
  if (!text) {
    return text;
  }

  return text
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
    trackIds: res.tracks.map(({ trackId }) => trackId),
    counts: {
      singer: res.singerCount.map(pairsFromCounts),
      orchestra: res.orchestraCount.map(pairsFromCounts),
      genre: res.genreCount.map(pairsFromCounts),
    },
  };
};
