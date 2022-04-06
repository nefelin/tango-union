import { useEffect } from 'react';

import { smartSummary } from '../components/PlaylistSummary/summarize';
import textualizeSmartSummary from '../components/PlaylistSummary/textualizeSmartSummary';
import useCacheStitchedIdFetch from '../components/ResultsTable/useCacheStitchedIdFetch';
import { CompactTrack } from '../types/compactTrack/types';
import {
  QUICKLIST_PLAYLIST_ID,
  RESULTS_PLAYLIST_ID,
} from './state/useGlobalPlaylistState/songLists.state';
import { usePlaylistState } from './state/usePlaylistState';
import { useEnsureValueNonReactive } from './useEnsureValue';

const DEFAULT_TITLE = 'Tango Union - Explore Argentine Tango Music';

const useDynamicPageTitle = () => {
  const {
    playlist: { tracks: playlistTracks },
  } = usePlaylistState(QUICKLIST_PLAYLIST_ID);
  const {
    playlist: { tracks: resultsTracks },
  } = usePlaylistState(RESULTS_PLAYLIST_ID);

  let dominantList: Array<CompactTrack> = [];
  if (playlistTracks.length) {
    dominantList = playlistTracks;
  } else {
    dominantList = resultsTracks;
  }

  const [hydratedTracks] = useCacheStitchedIdFetch(dominantList);

  const ensuredTracks = useEnsureValueNonReactive(hydratedTracks, []);

  const [headline, subtitle] = textualizeSmartSummary(smartSummary(ensuredTracks));

  useEffect(() => {
    const newTitle = headline ? `${headline} - ${subtitle}` : DEFAULT_TITLE;
    document.title = newTitle;
  }, [headline, subtitle]);
};

export default useDynamicPageTitle;
