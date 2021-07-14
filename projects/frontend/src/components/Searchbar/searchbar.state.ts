import { makeVar, useReactiveVar } from '@apollo/client';

import { SearchbarState } from './types';

const initSearchbarState: SearchbarState = {};

const reactiveSearchbarState = makeVar(initSearchbarState);

export const useSearchbarState = () => {
  const searchbarState = useReactiveVar(reactiveSearchbarState);

  const setSearchbarState = (newState: SearchbarState) =>
    reactiveSearchbarState(newState);
  const resetSearchbar = () => reactiveSearchbarState(initSearchbarState);

  return {
    searchbarState,
    resetSearchbar,
    setSearchbarState,
  };
};
