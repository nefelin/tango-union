import {
  CategoryMember,
  IndexedCategory,
  ReverseSelectIndex,
  SelectIndex, SelectIndexPair,
  SimpleTrack,
  TrackId,
} from '../types';
import * as r from 'ramda';
import { addTrackToIndex, addTrackToReverseIndex, getIndexGenre } from './util';

const NULL_LABELS = {
  SINGER: 'Instrumental',
  ORCHESTRA: 'Unknown',
  YEAR: 'Unknown',
};

export const tangoIndex = (allSongs: SimpleTrack[]): SelectIndexPair => {
  const index: SelectIndex = {
    orchestra: {},
    genre: {},
    singer: {},
    year: {},
  };

  const reverseIndex: ReverseSelectIndex = {};

  const addToIndices = (
    category: IndexedCategory,
    entry: CategoryMember,
    trackId: TrackId,
  ) => {
    addTrackToIndex(index, category, entry, trackId);
    addTrackToReverseIndex(reverseIndex, category, entry, trackId);
  };

  for (const { trackId, singer, year, orchestra, genre } of allSongs) {
    if (singer?.length) {
      singer.forEach((thisSinger) =>
        addToIndices('singer', thisSinger, trackId),
      );
    } else {
      addToIndices('singer', NULL_LABELS.SINGER, trackId);
    }

    if (orchestra?.length) {
      orchestra.forEach((thisOrchestra) =>
        addToIndices('orchestra', thisOrchestra, trackId),
      );
    } else {
      addToIndices('orchestra', NULL_LABELS.ORCHESTRA, trackId);
    }

    const yearEntry = r.isNil(year) ? NULL_LABELS.YEAR : year.toString();
    addToIndices('year', yearEntry, trackId);

    const indexGenre = getIndexGenre(genre);
    addToIndices('genre', indexGenre, trackId);
  }

  return { index, reverseIndex };
};

// Index should not contain songs
// export const tangoIndex = (rawSongs: SimpleTrack[]): IndexedSongData => {
//   const songs = r.map(songWithSlop, rawSongs);
//
//   const selectIndex = makeSelectIndex(songs);
//
//   return {
//     songs,
//     selectIndex,
//   };
// };
