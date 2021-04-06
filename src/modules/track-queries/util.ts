import { Maybe } from '../../types';
import * as r from 'ramda';

const intersectionReducer = (acc: Set<number>, curr: Set<number>) =>
  new Set([...acc, ...[...curr].filter((num) => acc.has(num))]);

export const shorterFirstSorter = (a: Set<any>, b: Set<any>) => a.size - b.size;

export const intersect = (sets: Array<Maybe<Set<number>>>): Set<number> => {
  if (!sets.length) return new Set();
  const filtered = sets.filter(r.complement(r.isNil));
  filtered.sort(shorterFirstSorter);
  return new Set(
    filtered.slice(1, sets.length).reduce(intersectionReducer, filtered[0]),
  );
};
