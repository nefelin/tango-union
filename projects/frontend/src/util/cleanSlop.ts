import * as r from 'ramda';

import { Barely } from '../types';

const foldDiacritics = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const dashesToSpaces = r.replace(/-/g, ' ');
const stripNonAlpha = r.replace(/[^A-zÀ-ú\d\s]/g, '');
const nullishToString = (x: Barely<string>): string => (r.isNil(x) ? '' : x);

export const cleanSlop = r.pipe(
  nullishToString,
  r.toLower,
  foldDiacritics,
  dashesToSpaces,
  stripNonAlpha,
  r.trim,
);
