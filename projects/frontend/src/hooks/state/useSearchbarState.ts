import { useDebounce } from 'use-debounce';

import { SearchbarState } from '../../components/Searchbar/types';
import { useRoutedState } from './useRoutedState';

const initSearchbarState: SearchbarState = {};

const DEFAULT_PAGE_TITLE = 'Tango Union - Explore Argentine Tango Music';
const DYNAMIC_TITLE_SUFFIX = 'Argentine Tango';

export const useSearchbarState = () => {
  const { search: searchbarState, setSearch: setSearchbarState } =
    useRoutedState();
  const [debouncedText] = useDebounce(searchbarState.text, 300);

  document.title = debouncedText?.length
    ? `${debouncedText} - ${DYNAMIC_TITLE_SUFFIX}`
    : DEFAULT_PAGE_TITLE;

  const resetSearchbar = () => setSearchbarState(initSearchbarState);

  return {
    searchbarState,
    resetSearchbar,
    setSearchbarState,
  };
};
