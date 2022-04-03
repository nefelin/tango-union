import { useNavigate } from 'react-router';

import { compoundIdStringFromCompactTrack } from '../types/compactTrack/util';
import { urlSearchParams, urlTrackParams } from '../util/urlParams';
import { QUICKLIST_PLAYLIST_ID } from './state/useGlobalPlaylistState/songLists.state';
import { usePlaylistState } from './state/usePlaylistState';
import { useSearchbarState } from './state/useSearchbarState';

const useNavigateWithParamState = () => {
  const navigate = useNavigate();
  const {
    playlist: { tracks },
  } = usePlaylistState(QUICKLIST_PLAYLIST_ID);
  const { searchbarState } = useSearchbarState();

  const params = JSON.stringify({
    ...urlSearchParams(searchbarState),
    ...urlTrackParams(tracks),
  });
  return (newPath: string) => navigate([newPath, params].join('/'));
};

export default useNavigateWithParamState;
