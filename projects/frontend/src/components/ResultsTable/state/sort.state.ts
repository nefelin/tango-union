import { makeVar, useReactiveVar } from '@apollo/client';
import * as r from 'ramda';

import { CompoundSortInput } from '../../../../generated/graphql';
import { SortState } from '../types/sortState';
import { sanitizeSort } from './sanitizeSort';

const initSortState: SortState = {};

const reactiveSortState = makeVar(initSortState);

export const useSortState = () => {
  const sort = useReactiveVar(reactiveSortState);

  const setSort = (newSort: SortState) => {
    reactiveSortState(newSort);
  };

  const resetSort = () => {
    reactiveSortState(initSortState);
  };

  const sanitized = sanitizeSort(sort); // removes nullish values
  const sortInput: CompoundSortInput = r.mapObjIndexed(
    (sortOrder) => (sortOrder === 'asc' ? 1 : -1),
    sanitized,
  );

  return {
    sort,
    sortInput,
    setSort,
    resetSort,
  };
};
