import { yearsIndex } from "./yearsIndex";
import {
  CategoryToMembers,
  categorySelectIndex,
  SelectOptions,
} from "./categoryIndex";
import { IndexedSongData, RawSong, TrackId } from "./types";
import { fuzzyIndex } from "./fuzzyIndex";
import {compoundSearcher} from "./compoundSearch";

export interface CompoundSearchOpts {
  offset?: number;
  limit?: number;
  optionsQuery?: Partial<CategoryToMembers>;
  searchQuery?: string;
}

type SingleTermSearch = (term: string) => TrackId[];
type MultiTermSearch = (terms: string[]) => TrackId[];

export interface HydratedCompoundSearchResults {
  songs: RawSong[];
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
    console.log("search opts", opts)
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

const songsByIds = (rawSongs: RawSong[], ids: TrackId[]): RawSong[] =>
  rawSongs.filter(({ _id }) => ids.indexOf(_id) > -1);
