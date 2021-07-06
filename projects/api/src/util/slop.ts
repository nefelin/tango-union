import * as r from 'ramda';
import { Barely } from '../types';

const arrayToString = (ar: Array<string> | string): string =>
  Array.isArray(ar) ? ar.join(' ') : ar;

export const valuesForSlop = (song: any) =>
  r.pipe(
    r.pick(['title', 'orchestra', 'singer', 'genre']),
    Object.values,
    r.reject(r.isEmpty),
    r.map(arrayToString),
    r.join(' '),
  )(song);

export const foldDiacritics = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const stripNonAlpha = r.replace(/[^A-zÀ-ú\d\s]/g, '');
const nullishToString = (x: Barely<string>): string => r.isNil(x) ? '' : x;
export const cleanSlop = r.pipe(nullishToString, r.toLower, foldDiacritics, stripNonAlpha);
export const slopFromSong = r.pipe(valuesForSlop, cleanSlop);