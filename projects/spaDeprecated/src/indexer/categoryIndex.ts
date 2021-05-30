import * as r from 'ramda';
import type { RawSong, TrackId } from './types';

const indexedCategories = ['singer', 'orchestra', 'genre'] as const;

export type IndexedCategory = typeof indexedCategories[number];

type CategoryMember = string;

export type CategorySummary = Record<CategoryMember, number>;

export type SelectOptions = Record<IndexedCategory, CategorySummary>;

export type CategoryToMembers = Record<IndexedCategory, Array<CategoryMember>>;

export type MemberToTracks = Record<CategoryMember, Array<RawSong['_id']>>;

export type SelectIndex = Record<IndexedCategory, MemberToTracks>;

export const categorySelectIndex = (
  allSongs: Array<RawSong>,
  selectIndex: SelectIndex
) => {
  const selectOptions: SelectOptions = selectOptionsFromIndex(selectIndex);

  const selectBy = r.curry(
    (category: IndexedCategory, terms: Array<string>): Array<TrackId> => {
      const idsFromTerm = (term: string) => selectIndex[category][term] || [];

      const ids = r.pipe<Array<string>, Array<Array<TrackId>>, Array<TrackId>>(
        r.map(idsFromTerm),
        r.flatten
      )(terms);

      if (r.any(r.isNil, ids)) {
        throw new Error(
          `CategorySelect produced nil result with terms ${terms}. Are these valid terms?`
        );
      }
      return ids;
    }
  );

  const songsBySingers = selectBy('singer');
  const songsByOrchestras = selectBy('orchestra');
  const songsByGenres = selectBy('genre');

  return {
    songsBySingers,
    songsByOrchestras,
    songsByGenres,
    selectOptions,
  };
};

export const emptySelectOptions: SelectOptions = {
  genre: {},
  singer: {},
  orchestra: {},
};

export const selectOptionsFromIndex: (
  index: SelectIndex
) => SelectOptions = r.mapObjIndexed(r.mapObjIndexed(r.length));
