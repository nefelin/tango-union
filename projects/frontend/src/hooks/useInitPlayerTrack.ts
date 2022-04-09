import { makeVar, useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';

import {
  QUICKLIST_PLAYLIST_ID,
  RESULTS_PLAYLIST_ID,
} from './state/useGlobalPlaylistState/songLists.state';
import { usePlaylistState } from './state/usePlaylistState';
import { useYoutubePlayerState } from './state/useYoutubePlayerState';

const reactiveTrackPlayed = makeVar(false);
const useInitPlayerTrack = () => {
  const trackHasPlayed = useReactiveVar(reactiveTrackPlayed);
  const { setTrack } = useYoutubePlayerState();
  const {
    playlist: { tracks: resultTracks },
  } = usePlaylistState(RESULTS_PLAYLIST_ID);
  const {
    playlist: { tracks: playlistTracks },
  } = usePlaylistState(QUICKLIST_PLAYLIST_ID);

  useEffect(() => {
    if (trackHasPlayed) {
      return;
    }

    if (playlistTracks[0]) {
      setTrack(playlistTracks[0]);
    } else if (resultTracks[0]) {
      setTrack(resultTracks[0]);
    }
  }, [resultTracks, playlistTracks]);

  return {
    playedTrack: () => reactiveTrackPlayed(true),
  };
};

export default useInitPlayerTrack;
