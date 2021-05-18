import { Injectable } from '@nestjs/common';
import { IndexService } from '../index/index.service';
import { CompoundQueryInput } from './dto/compoundQuery.input';
import { intersect } from './util';
import { Maybe } from '../../types';
import { IndexedCategory, SelectIndexCount, TrackId } from 'tango-index';

@Injectable()
export class TrackQueriesService {
  constructor(private readonly indexService: IndexService) {}

  private songsByCategory(
    category: IndexedCategory,
    terms: Array<string | number>,
  ): Maybe<Set<number>> {
    if (!terms) return null;
    const { selectIndex } = this.indexService.getIndex();
    const resultSet = new Set<number>();
    for (const term of terms) {
      if (!selectIndex[category][term]) continue;
      selectIndex[category][term].forEach((id) => resultSet.add(id));
    }

    return resultSet;
  }

  compoundSearch(query: CompoundQueryInput): ResultsIndex {
    const { orchestra, genre, singer, year } = query;

    const results: Record<IndexedCategory, Maybe<Set<number>>> = {
      orchestra: this.songsByCategory('orchestra', orchestra),
      singer: this.songsByCategory('singer', singer),
      genre: this.songsByCategory('genre', genre),
      year: this.songsByCategory('year', year),
    };

    const resultsWithout: Record<IndexedCategory, Maybe<Set<number>>> = {
      orchestra: null,
      singer: null,
      genre: null,
      year: null,
    };

    const songs = [...intersect(Object.values(results))];

    const allCategories = Object.keys(results);
    for (const category of allCategories) {
      if (query[category]?.length) {
        const otherCategories = allCategories
          .filter((thisCat) => thisCat !== category)
          .map((thisCat) => results[thisCat]);
        resultsWithout[category] = intersect(otherCategories);
      } else {
        // we know that if theres no terms for a category, results without its terms will just be the end intersection
        resultsWithout[category] = songs;
      }
    }

    console.log({ results, resultsWithout });

    // figure out counts here --- we need the results for the text search here too!

    // intersect the partially intersect (slightly faster?) to get our final results

    return {
      songs,
      selectIndexCounts: {
        year: {},
        genre: {},
        singer: {},
        orchestra: {},
      },
    };
  }
}

interface ResultsIndex {
  songs: TrackId[];
  selectIndexCounts: SelectIndexCount;
}