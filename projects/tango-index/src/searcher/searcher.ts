import * as r from 'ramda';
import { CompoundIndex } from '../compoundIndex/compoundIndex';
import {
  CategoryMember,
  emptySelectIndexCount,
  IndexedCategory,
  TrackId,
} from '../types/types';
import { intersectionReducer } from '../compoundIndex/util';
import { YearParser } from './years/yearParser';
import { CategoryInput, CompoundInput, CompoundResults, NULL_LABELS } from './types';

export class Searcher {
  index: CompoundIndex;

  constructor(compoundIndex: CompoundIndex) {
    this.index = compoundIndex;
  }

  private byText(term: string): Set<TrackId> {
    return this.index.textIndexer.search(term);
  }

  private byCategoriesMembers(criteria: CategoryInput): Set<TrackId> {
    const categoryFinds: Partial<Record<IndexedCategory, Set<TrackId>>> = {};

    for (let [category, members] of Object.entries(criteria) as Array<
      [IndexedCategory, Array<CategoryMember>]
    >) {
      categoryFinds[category] = new Set(
        this.index.selectIndexer.tracksByCategoryMembers(category, members),
      );
    }

    return (Object.values(categoryFinds) as Array<Set<TrackId>>).reduce(
      intersectionReducer,
    );
  }

  byCompoundSearch(criteria: CompoundInput): CompoundResults {
    const {text = '', categories} = criteria;

    // parse years out
    const thisparser = new YearParser(NULL_LABELS.YEAR);
    const searchYears = thisparser.yearsFromSearch(text);
    const searchTerm = thisparser.stripYearTerms(text);

    // perform text search
    const textIds = searchTerm.length ? this.byText(searchTerm) : null;

    // pass years in to category search
    const categoriesWithYears = {
      ...categories ? categories : {},
      ...searchYears ? {year: searchYears} : {},
    }
    const categoryIds = r.isEmpty(categoriesWithYears) ? null : this.byCategoriesMembers(categoriesWithYears
    );

    // intersect text results with category results
    const onlyIds = r.reject(r.isNil, [textIds, categoryIds]) as Array<Set<TrackId>>;
    const allIds: Array<TrackId> = onlyIds.length ? Array.from(
       onlyIds.reduce(intersectionReducer)
    ): [];

    // generate member counts for each category
    const counts = r.mapObjIndexed(
      (val, key) =>
        this.index.selectIndexer.countsFromTracksSingleCat(allIds, key),
      emptySelectIndexCount(),
    );

    // return counts and trackIds
    return {
      trackIds: allIds,
      counts,
    };
  }
}
