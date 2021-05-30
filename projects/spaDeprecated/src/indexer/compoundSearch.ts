import * as r from 'ramda';
import type { TrackId } from './types';
import { validYearTerms } from './yearsIndex';
import type { CompoundSearchOpts, IndexInterface } from './indexer';
import type { IndexedCategory, SelectIndex, SelectOptions } from './categoryIndex';

type CompoundSearcherArgs = Omit<
  IndexInterface,
  'selectOptions' | 'compoundSearch'
> & { selectOptions: SelectOptions; selectIndex: SelectIndex };

interface CompoundSearchResults {
  songs: Array<TrackId>;
  filteredSelectOptions: SelectOptions;
}

export const compoundSearcher = ({
  selectOptions,
  selectIndex,
  songsBySingers,
  songsByGenres,
  songsByOrchestras,
  songsByFuzzy,
  songsByYears,
}: CompoundSearcherArgs) => (
  opts: CompoundSearchOpts
): CompoundSearchResults => {
  const { limit = Infinity, offset = 0 } = opts; // would like to process pagination differently, since sorting will add complication TODO

  const orchestraFinds =
    opts.optionsQuery?.orchestra &&
    songsByOrchestras(opts.optionsQuery.orchestra);
  const singerFinds =
    opts.optionsQuery?.singer && songsBySingers(opts.optionsQuery.singer);
  const genreFinds =
    opts.optionsQuery?.genre && songsByGenres(opts.optionsQuery.genre);
  let yearFinds: Array<TrackId> | undefined;
  let searchFinds: Array<TrackId> | undefined;
  if (opts.searchQuery) {
    const extractedYearTerms = opts.searchQuery.match(validYearTerms);
    let cleanSearch = opts.searchQuery;

    if (extractedYearTerms) {
      yearFinds = songsByYears(extractedYearTerms.join(' '));

      cleanSearch = cleanSearch.replace(validYearTerms, '');
    }

    searchFinds = songsByFuzzy(cleanSearch);
  }

  console.log({
    optsQuery: opts.optionsQuery,
    orchestraFinds,
    singerFinds,
    genreFinds,
    yearFinds,
    searchFinds,
  });

  const intersectedSearchYear = intersectedTracks([yearFinds, searchFinds]);

  const intersectedWithoutSinger = intersectedTracks([
    intersectedSearchYear,
    orchestraFinds,
    genreFinds,
  ]);
  const intersectedWithoutOrchestra = intersectedTracks([
    intersectedSearchYear,
    singerFinds,
    genreFinds,
  ]);
  const intersectedWithoutGenre = intersectedTracks([
    intersectedSearchYear,
    orchestraFinds,
    singerFinds,
  ]);
  const intersectedAll = intersectedTracks([
    intersectedWithoutSinger,
    intersectedWithoutGenre,
    intersectedWithoutOrchestra,
  ]);

  const makeOptions = makeSelectOptionsForCategory(selectIndex);
  const singerOptions =
    intersectedWithoutSinger &&
    (!!opts.optionsQuery?.orchestra ||
      !!opts.optionsQuery?.genre ||
      !!opts.searchQuery) // this check could be abstracted since we'll do it three times
      ? makeOptions('singer', intersectedWithoutSinger)
      : selectOptions.singer;

  const orchestraOptions =
    intersectedWithoutOrchestra &&
    (!!opts.optionsQuery?.singer ||
      !!opts.optionsQuery?.genre ||
      !!opts.searchQuery) // this check could be abstracted since we'll do it three times
      ? makeOptions('orchestra', intersectedWithoutOrchestra)
      : selectOptions.orchestra;

  const genreOptions =
    intersectedWithoutGenre &&
    (!!opts.optionsQuery?.orchestra ||
      !!opts.optionsQuery?.singer ||
      !!opts.searchQuery) // this check could be abstracted since we'll do it three times
      ? makeOptions('genre', intersectedWithoutGenre)
      : selectOptions.genre;

  const songs = intersectedAll?.slice(offset, limit + offset) ?? [];

  return {
    songs,
    filteredSelectOptions: {
      orchestra: orchestraOptions,
      singer: singerOptions,
      genre: genreOptions,
    },
  };
};

const makeSelectOptionsForCategory = r.curry(
  (index: SelectIndex, category: IndexedCategory, finds: Array<TrackId>) =>
    r.mapObjIndexed(
      r.pipe(r.filter(r.contains(r.__, finds)), r.length),
      index[category]
    )
);

const intersectedTracks = (ids: Array<Array<TrackId> | undefined>) => {
  const intersectableTracks = r.reject(r.isNil, ids) as Array<Array<TrackId>>;
  switch (intersectableTracks.length) {
    case 0:
      return undefined;
    case 1:
      return r.flatten(intersectableTracks);
    default:
      // FIXME check intersection implementation, probably sorting smllest to largest list before intersect is beneficial for performance.
      return r.reduce<Array<TrackId>, Array<TrackId>>(
        r.intersection,
        intersectableTracks[0] || [],
        intersectableTracks.slice(1, intersectableTracks.length)
      );
  }
  // const intersection = intersectableTracks.length > 1
  //   ? r.reduce<number[], number[]>(
  //       r.intersection,
  //       intersectableTracks[0],
  //       intersectableTracks.slice(1, intersectableTracks.length)
  //     )
  //   : r.flatten(intersectableTracks);
  // console.log({intersection, intersectableTracks, ids})
  // return intersection;
};
