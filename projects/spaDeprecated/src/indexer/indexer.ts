import { yearsIndex } from './yearsIndex';
import type {
  CategoryToMembers,
  SelectOptions} from './categoryIndex';
import {
  categorySelectIndex
} from './categoryIndex';
import type { IndexedSongData, RawSong, TrackId } from './types';
import { fuzzyIndex } from './fuzzyIndex';
import {compoundSearcher} from './compoundSearch';

export interface CompoundSearchOpts {
  offset?: number;
  limit?: number;
  optionsQuery?: Partial<CategoryToMembers>;
  searchQuery?: string;
}

type SingleTermSearch = (term: string) => Array<TrackId>;
type MultiTermSearch = (terms: Array<string>) => Array<TrackId>;

export interface HydratedCompoundSearchResults {
  songs: Array<RawSong>;
  filteredSelectOptions: SelectOptions;
}

export interface IndexInterface {
  selectOptions: SelectOptions;
  compoundSearch: (opts: CompoundSearchOpts) => HydratedCompoundSearchResults;
  songsByFuzzy: SingleTermSearch;
  songsByYears: SingleTermSearch;
  songsBySingers: MultiTermSearch;
  songsByOrchestras: MultiTermSearch;
  songsByGenres: MultiTermSearch;
}

export const songSearcher = ({
  songs,
  selectIndex,
}: IndexedSongData): IndexInterface => {

  const {
    songsByOrchestras,
    songsBySingers,
    songsByGenres,
    selectOptions,
  } = categorySelectIndex(songs, selectIndex);

  const { songsByFuzzy } = fuzzyIndex(songs);

  const { songsByYears } = yearsIndex(songs);

  const compound = compoundSearcher({
    selectOptions,
    selectIndex,
    songsByYears,
    songsByFuzzy,
    songsByGenres,
    songsByOrchestras,
    songsBySingers,
  });

  const compoundSearch = (
    opts: CompoundSearchOpts
  ): HydratedCompoundSearchResults => {
    console.log('search opts', opts)
    const res = compound(opts);
    return { ...res, songs: songsByIds(songs, res.songs) };
  };

  return {
    selectOptions,
    compoundSearch,
    songsBySingers,
    songsByOrchestras,
    songsByGenres,
    songsByFuzzy,
    songsByYears,
  };
};

const songsByIds = (rawSongs: Array<RawSong>, ids: Array<TrackId>): Array<RawSong> =>
  rawSongs.filter(({ _id }) => ids.indexOf(_id) > -1);
