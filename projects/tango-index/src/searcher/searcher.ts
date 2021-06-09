import * as r from 'ramda';
import { CompoundIndex } from '../index/compoundIndex';
import {
  CategoryMember,
  emptySelectIndexCount,
  IndexedCategory,
  SelectIndexCount,
  TrackId,
} from '../types/types';
import { intersectionReducer } from '../index/util';

type CategoryInput = Partial<Record<IndexedCategory, Array<CategoryMember>>>;
interface CompoundInput {
  text?: string;
  categories: CategoryInput;
}

interface CompoundResults {
  trackIds: Array<TrackId>;
  counts: SelectIndexCount;
}

export class Searcher {
  index: CompoundIndex;

  constructor(compoundIndex: CompoundIndex) {
    this.index = compoundIndex;
  }

  byText(term: string): Set<TrackId> {
    return this.index.textIndexer.search(term);
  }

  byCategoriesMembers(criteria: CategoryInput): Set<TrackId> {
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
    // parse years out
    const [searchYears, searchTerm] = criteria.text
      ? this.consumeYearTerms(criteria.text)
      : [undefined, null];
    // perform text search
    const textIds = searchTerm ? this.byText(searchTerm) : null;

    // pass years in to category search
    const categoryIds = this.byCategoriesMembers({
      ...criteria.categories,
      year: searchYears,
    });

    // intersect text results with category results
    const allIds = Array.from(
      textIds
        ? [textIds, categoryIds].reduce(intersectionReducer)
        : categoryIds,
    );

    // generate member counts for each category
    const counts = r.mapObjIndexed(
      (val, key, ob) =>
        this.index.selectIndexer.countsFromTracksSingleCat(allIds, key),
      emptySelectIndexCount(),
    );

    // return counts and trackIds
    return {
      trackIds: allIds,
      counts,
    };
  }

  private consumeYearTerms(term: string): [Array<string>, string] {
    // takes a search term, extracts the year-related search terms, converts them to array of years
    // and returns the year array with the cleaned search term
    return [[], ''];
  }
}
