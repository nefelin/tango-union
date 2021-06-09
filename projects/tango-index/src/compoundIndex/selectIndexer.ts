import {
  CategoryMember,
  emptySelectIndex,
  IndexedCategory,
  ReverseSelectIndex,
  SelectIndex,
  SelectIndexPair,
  SimpleTrack,
  TrackId,
} from '../types/types';
import * as r from 'ramda';
import { getIndexGenre } from './util';
import { NULL_LABELS } from '../searcher/types';

export class SelectIndexer {
  private index: SelectIndex = emptySelectIndex();
  private reverseIndex: ReverseSelectIndex = {};

  constructor(tracks?: Array<SimpleTrack>) {
    if (tracks) {
      tracks.forEach((track) => this.indexTrack(track));
    }
  }

  toJSON() {
    return {
      index: this.index,
      reverseIndex: this.reverseIndex,
    };
  }

  loadIndexes(stringifiedIndexes: string) {
    try {
      const data = JSON.parse(stringifiedIndexes);
      this.index = data.index;
      this.reverseIndex = data.reverseIndex;
    } catch (e) {
      throw new Error(`malformed indexes: ${e}`);
    }
  }

  private indexCategory(
    category: IndexedCategory,
    entry: CategoryMember,
    trackId: TrackId,
  ) {
    this.index[category] = {
      ...this.index[category],
      [entry]: [...(this.index[category][entry] || []), trackId],
    };
  }

  private reverseIndexCategory(
    category: IndexedCategory,
    entry: CategoryMember,
    trackId: TrackId,
  ) {
    this.reverseIndex[trackId] = {
      ...this.reverseIndex[trackId],
      [category]: [
        ...((this.reverseIndex[trackId] || {})[category] || []),
        entry,
      ],
    };
  }

  private addToIndices(
    category: IndexedCategory,
    entry: CategoryMember,
    trackId: TrackId,
  ) {
    this.indexCategory(category, entry, trackId);
    this.reverseIndexCategory(category, entry, trackId);
  }

  // countsFromTracks(tracks: Array<TrackId>): SelectIndexCount {
  //   const count = emptySelectIndexCount();
  //   tracks.forEach((id) => {
  //     const reverse = this.reverseIndex[id];
  //     if (reverse) {
  //       for (let [key, value] of Object.entries(reverse) as Array<
  //         [IndexedCategory, Array<CategoryMember>]
  //       >) {
  //         for (let member of value) {
  //           count[key][member] = count[key][member]
  //             ? count[key][member] + 1
  //             : 1;
  //         }
  //       }
  //     }
  //   });
  //
  //   return count;
  // }

  countsFromTracksSingleCat(
    tracks: Array<TrackId>,
    cat: IndexedCategory,
  ): Record<CategoryMember, number> {
    const count: Record<CategoryMember, number> = {};

    tracks.forEach((id) => {
      const reverse = this.reverseIndex[id];
      if (reverse) {
        const value = reverse[cat];
        for (let member of value) {
          count[member] = count[member] ? count[member] + 1 : 1;
        }
      }
    });

    return count;
  }

  tracksByCategoryMembers(
    category: IndexedCategory,
    members: Array<CategoryMember>,
  ): Array<TrackId> {
    const ids: Array<TrackId> = [];

    for (let member of members) {
      const found = this.index[category][member];
      if (found) {
        ids.push(...found);
      }
    }

    return r.uniq(ids);
  }

  indexTrack(track: SimpleTrack) {
    const { trackId, singer, year, orchestra, genre } = track;
    if (singer?.length) {
      singer.forEach((thisSinger) =>
        this.addToIndices('singer', thisSinger, trackId),
      );
    } else {
      this.addToIndices('singer', NULL_LABELS.SINGER, trackId);
    }

    if (orchestra?.length) {
      orchestra.forEach((thisOrchestra) =>
        this.addToIndices('orchestra', thisOrchestra, trackId),
      );
    } else {
      this.addToIndices('orchestra', NULL_LABELS.ORCHESTRA, trackId);
    }

    const yearEntry = r.isNil(year) ? NULL_LABELS.YEAR : year.toString();
    this.addToIndices('year', yearEntry, trackId);

    const indexGenre = getIndexGenre(genre);
    this.addToIndices('genre', indexGenre, trackId);
  }
}
