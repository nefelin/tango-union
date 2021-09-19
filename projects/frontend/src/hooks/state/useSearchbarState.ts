import { useApolloClient } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { searchStateFromTracks } from '../../components/DragContext/searchStateFromTracks';
import useCacheStitchedIdFetch from '../../components/ResultsTable/useCacheStitchedIdFetch';
import { SearchbarState } from '../../components/Searchbar/types';
import { CompactTrack } from '../../types/compactTrack/types';
import { useRoutedState } from './useRoutedState';

const initSearchbarState: SearchbarState = {};

const DEFAULT_PAGE_TITLE = 'Tango Union - Explore Argentine Tango Music';
const DYNAMIC_TITLE_SUFFIX = 'Argentine Tango';

export const useSearchbarState = () => {
  const { search: searchbarState, setSearch: setSearchbarState } =
    useRoutedState();
  const [debouncedText] = useDebounce(searchbarState.text, 300);
  const apolloClient = useApolloClient();
  const [idSources, setIdSources] = useState<Array<CompactTrack> | null>(null);
  const [trackSources] = useCacheStitchedIdFetch(idSources || [])

  useEffect(() => {
    if (trackSources?.length) {
      setSearchbarState(searchStateFromTracks(trackSources))
    }
  },[JSON.stringify(trackSources)])

  const searchFromIds = (ids: Array<CompactTrack>) => {
    setIdSources(ids);
  }

  // stick search in the title, helpful juggling tabs
  document.title = debouncedText?.length
    ? `${debouncedText} - ${DYNAMIC_TITLE_SUFFIX}`
    : DEFAULT_PAGE_TITLE;

  const resetSearchbar = () => setSearchbarState(initSearchbarState);

  return {
    searchFromIds,
    searchbarState,
    resetSearchbar,
    setSearchbarState,
  };
};
