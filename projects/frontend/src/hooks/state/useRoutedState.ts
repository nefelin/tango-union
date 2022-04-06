import * as r from 'ramda';
import { useNavigate, useParams } from 'react-router';

import { PanelOption } from '../../components/MobileNavbar';
import { SearchbarState } from '../../components/Searchbar/types';
import { CompoundIdString } from '../../types/compactTrack/types';

interface SavedState {
  tracks: Array<CompoundIdString>;
  search: SearchbarState;
  panel: PanelOption;
}

export const useRoutedState = () => {
  const { saved } = useParams<{ saved?: string }>();
  const navigate = useNavigate();

  let paramObj: SavedState = { tracks: [], search: {}, panel: 'search' };

  if (!r.isNil(saved)) {
    try {
      paramObj = {...paramObj, ...JSON.parse(saved)};
    } catch (e: unknown) {
      console.error('bad save data');
    }
  }

  const replaceRoute = (newState: SavedState) => {
    const asString = JSON.stringify(newState);
    const urlBase = window.location.pathname.split('/')[1] ?? 'mobile'; // todo hacky fix
    navigate(`/${urlBase}/${asString}`);
  };

  const setTracks = (newTracks: Array<CompoundIdString>) => {
    replaceRoute({ ...paramObj, tracks: newTracks });
  };

  const setSearch = (newSearch: SearchbarState) => {
    replaceRoute({ ...paramObj, search: newSearch });
  };

  const setPanel = (newPanel: PanelOption) => {
    replaceRoute({ ...paramObj, panel: newPanel });
  };


  return {
    tracks: paramObj.tracks,
    search: paramObj.search,
    panel: paramObj.panel,
    setTracks,
    setSearch,
    setPanel
  };
};
