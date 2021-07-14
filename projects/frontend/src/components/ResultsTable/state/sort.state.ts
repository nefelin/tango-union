import { makeVar, useReactiveVar } from '@apollo/client';
import * as r from 'ramda';

import { CompoundSortInput } from '../../../../generated/graphql';
import { SortState } from '../types/sortState';

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

  const sortInput: CompoundSortInput = r.mapObjIndexed(
    (sortOrder) => (sortOrder === 'asc' ? 1 : -1),
    sort,
  );

  return {
    sort,
    sortInput,
    setSort,
    resetSort,
  };
};
