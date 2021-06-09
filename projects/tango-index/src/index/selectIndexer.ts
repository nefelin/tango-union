import {
  CategoryMember,
  emptySelectIndex,
  emptySelectIndexCount,
  IndexedCategory,
  ReverseSelectIndex,
  SelectIndex,
  SelectIndexCount,
  SelectIndexPair,
  SimpleTrack,
  TrackId,
} from '../types/types';
import * as r from 'ramda';
import { getIndexGenre } from './util';

export class SelectIndexer {
  private index: SelectIndex = emptySelectIndex();
  private reverseIndex: ReverseSelectIndex = {};

  constructor(tracks?: Array<SimpleTrack>) {
    if (tracks) {
      tracks.forEach((track) => this.indexTrack(track));
    }
  }

  loadIndexes({ index, reverseIndex }: SelectIndexPair) {
    this.index = index;
    this.reverseIndex = reverseIndex;
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

  countsFromTracks(tracks: Array<TrackId>, category?: IndexedCategory): SelectIndexCount {
    if (category) {
      return this.countsFromTracksSingleCat(tracks, category);
    }

    const count = emptySelectIndexCount();
    tracks.forEach((id) => {
      const reverse = this.reverseIndex[id];
      if (reverse) {
        for (let [key, value] of Object.entries(reverse) as Array<
          [IndexedCategory, Array<CategoryMember>]
        >) {
          for (let member of value) {
            count[key][member] = count[key][member]
              ? count[key][member] + 1
              : 1;
          }
        }
      }
    });

    return count;
  }

  tracksByCategoryMembers(category: IndexedCategory, members: Array<CategoryMember>): Array<TrackId> {
    const ids: Array<TrackId> = [];

    for (let member of members) {
      ids.push(...this.index[category][member])
    }

    return r.uniq(ids);
  }

  private countsFromTracksSingleCat(
    tracks: Array<TrackId>,
    cat: IndexedCategory,
  ): SelectIndexCount {
    const count = emptySelectIndexCount();
    tracks.forEach((id) => {
      const reverse = this.reverseIndex[id];
      if (reverse) {
        const value = reverse[cat];
        const key = cat;
        for (let member of value) {
          count[key][member] = count[key][member] ? count[key][member] + 1 : 1;
        }
      }
    });

    return count;
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

const NULL_LABELS = {
  SINGER: 'Instrumental',
  ORCHESTRA: 'Unknown',
  YEAR: 'Unknown',
};
