import * as r from 'ramda';
import { useHistory, useParams } from 'react-router';

import { SearchbarState } from '../components/Searchbar/types';

interface SavedState {
  tracks: Array<string>;
  search: SearchbarState;
}

export const useRoutedState = () => {
  const { saved } = useParams<{ saved?: string }>();
  const history = useHistory();

  let paramObj: SavedState = {tracks: [], search: {}};

  if (!r.isNil(saved)) {
    try {
      paramObj = JSON.parse(saved);
    } catch (e: unknown) {
      console.error('bad save data');
    }
  }

  const replaceRoute = (newState: SavedState) => {
    const asString = JSON.stringify(newState);
    history.replace(`/player/${asString}`);
  };

  const setTracks = (newTracks: Array<string>) =>
    replaceRoute({ ...paramObj, tracks: newTracks });

  const setSearch = (newSearch: SearchbarState) =>
    replaceRoute({ ...paramObj, search: newSearch });

  return {
    tracks: paramObj.tracks,
    search: paramObj.search,
    setTracks,
    setSearch,
  };
};
