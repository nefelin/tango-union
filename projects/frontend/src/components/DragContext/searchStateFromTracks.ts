import * as r from 'ramda';

import { SimpleTrack } from '../../../generated/graphql';
import { SearchbarState } from '../Searchbar/types';

export const searchStateFromTracks = (
  tracks: Array<SimpleTrack>
): SearchbarState => {
  const yearWindow = 2;
  const years = tracks
    .map(({ year }) => year)
    .filter(r.complement(r.isNil)) as Array<number>;
  const bufferedTermFromYear = (buffer: number) => (year: number) =>
    `${year - buffer}-${year + buffer}`;
  const yearTerms = years.map(bufferedTermFromYear(yearWindow)).join(' ');

  const aggregator = (prop: keyof SimpleTrack) =>
    r.pipe(
      r.map(r.propOr(null, prop)),
      r.reject(r.isNil),
      r.flatten,
      r.uniq
    )(tracks) as Array<string>;

  return {
    text: yearTerms,
    orchestras: aggregator('orchestra'),
    singers: aggregator('singer'),
    genres: aggregator('genre'),
  };
};