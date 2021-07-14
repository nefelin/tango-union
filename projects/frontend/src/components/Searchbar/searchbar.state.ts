import { useRoutedState } from '../../hooks/useRoutedState';
import { SearchbarState } from './types';

const initSearchbarState: SearchbarState = {};

export const useSearchbarState = () => {
  const { search: searchbarState, setSearch: setSearchbarState } =
    useRoutedState();

  const resetSearchbar = () => setSearchbarState(initSearchbarState);

  return {
    searchbarState,
    resetSearchbar,
    setSearchbarState,
  };
};
