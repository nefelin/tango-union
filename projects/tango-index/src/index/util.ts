import * as r from 'ramda';
import {
  CategoryMember,
  IndexedCategory,
  ReverseSelectIndex,
  SelectIndex,
  SimpleTrack,
  TrackId,
} from '../types';

export const foldDiacritics = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const stripNonAlpha = r.replace(/[^A-zÀ-ú\d\s]/g, '');

export const cleanSlop = r.pipe(
  r.toLower,
  foldDiacritics,
  stripNonAlpha,
  r.trim,
);

const genreNames = {
  tango: 'tango',
  vals: 'vals',
  milonga: 'milonga',
  other: 'other',
};

export const getIndexGenre = (genre?: string) => {
  if (!genre) {
    return genreNames.other;
  }

  if (r.contains(genreNames.tango)(genre)) return genreNames.tango;
  if (r.contains(genreNames.vals)(genre)) return genreNames.vals;
  if (r.contains(genreNames.milonga)(genre)) return genreNames.milonga;

  return genreNames.other;
};

export const flattenSingersAndOrchestras = ({
  orchestra,
  singer,
  ...rest
}: SimpleTrack) => ({
  ...rest,
  orchestra: orchestra && orchestra.join(' '),
  singer: singer && singer.join(' '),
});

export const valuesForSlop = (song: SimpleTrack) =>
  r.pipe(
    flattenSingersAndOrchestras,
    r.omit(['secondsLong', '_id', 'trackId', 'year']),
    Object.values,
    r.reject(r.isEmpty),
    r.join(' '),
  )(song);

export const slopFromSong = r.pipe(valuesForSlop, cleanSlop);

export const songWithSlop = (song: SimpleTrack) => ({
  ...song,
  slop: slopFromSong(song),
});

export const addTrackToIndex = (
  index: SelectIndex,
  category: IndexedCategory,
  entry: CategoryMember,
  trackId: TrackId,
) => {
  index[category] = {
    ...index[category],
    [entry]: [...(index[category][entry] || []), trackId],
  };
};

export const addTrackToReverseIndex = (
  reverseIndex: ReverseSelectIndex,
  category: IndexedCategory,
  entry: CategoryMember,
  trackId: TrackId,
) => {
  reverseIndex[trackId] = {
    ...reverseIndex[trackId],
    [category]: [...((reverseIndex[trackId] || {})[category] || []), entry],
  };
};
