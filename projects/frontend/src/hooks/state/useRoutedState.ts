import * as r from 'ramda';
import { useNavigate, useParams } from 'react-router';

import { SearchbarState } from '../../components/Searchbar/types';
import { CompoundIdString } from '../../types/compactTrack/types';

interface SavedState {
  tracks: Array<CompoundIdString>;
  search: SearchbarState;
}

export const useRoutedState = () => {
  const { saved } = useParams<{ saved?: string }>();
  const navigate = useNavigate();

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
    navigate(`/player/${asString}`);
  };

  const setTracks = (newTracks: Array<CompoundIdString>) =>
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
