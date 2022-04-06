import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { searchStateFromTracks } from '../../components/DragContext/searchStateFromTracks';
import useCacheStitchedIdFetch from '../../components/ResultsTable/useCacheStitchedIdFetch';
import { SearchbarState } from '../../components/Searchbar/types';
import { CompactTrack } from '../../types/compactTrack/types';
import { useRoutedState } from './useRoutedState';

const initSearchbarState: SearchbarState = {};

export const useSearchbarState = () => {
  const { search: searchbarState, setSearch: setSearchbarState } =
    useRoutedState();
  const [debouncedText] = useDebounce(searchbarState.text, 300);
  const [idSources, setIdSources] = useState<Array<CompactTrack> | null>(null);
  const [trackSources] = useCacheStitchedIdFetch(idSources || [])

  useEffect(() => {
    if (trackSources?.length) {
      setSearchbarState(searchStateFromTracks(trackSources))
    }
  },[JSON.stringify(trackSources)])

  const searchFromIds = (tracks: Array<CompactTrack>) => {
    setIdSources(tracks);
  }

  const resetSearchbar = () => setSearchbarState(initSearchbarState);

  return {
    searchFromIds,
    searchbarState,
    resetSearchbar,
    setSearchbarState,
  };
};
