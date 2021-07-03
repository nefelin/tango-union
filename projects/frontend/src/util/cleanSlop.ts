import * as r from 'ramda';

const foldDiacritics = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const stripNonAlpha = r.replace(/[^A-zÀ-ú\d\s]/g, '');

export const cleanSlop = r.pipe(
  r.toLower,
  foldDiacritics,
  stripNonAlpha,
  r.trim,
);
