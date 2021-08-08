import { makeVar, useReactiveVar } from '@apollo/client';

import { PlaylistTrack, TrackIdTuple } from './usePlaylistsState/types';
import { sameId, tupleIdFromPlaylistTrack } from './usePlaylistsState/util';
import {
  HookProps,
  TrackStatus,
  YoutubePlayerState,
} from './useYoutubePlayerState/types';

const initYoutubePlayerState: YoutubePlayerState = {
  trackId: null,
  playState: 'stopped',
};

const reactiveYoutubePlayerState = makeVar(initYoutubePlayerState);

export const useYoutubePlayerState = (): HookProps => {
  const youtubePlayerState = useReactiveVar(reactiveYoutubePlayerState);

  const stop = () =>
    reactiveYoutubePlayerState({
      ...reactiveYoutubePlayerState(),
      playState: 'stopped',
    });

  const pause = () =>
    reactiveYoutubePlayerState({
      ...reactiveYoutubePlayerState(),
      playState: 'stopped',
    });

  const resume = () =>
    reactiveYoutubePlayerState({
      ...reactiveYoutubePlayerState(),
      playState: 'playing',
    });

  const play = (trackId: TrackIdTuple) => {
    const currentState = reactiveYoutubePlayerState();
    const newTrack = !sameId(trackId, currentState.trackId);
    const playState = newTrack ? 'loading' : 'playing';

    reactiveYoutubePlayerState({
      ...currentState,
      playState,
      trackId,
    });
  };

  const trackStatus = (
    track: PlaylistTrack,
  ): TrackStatus => {
    const id = tupleIdFromPlaylistTrack(track);
    const { trackId, playState} = youtubePlayerState;
    let active = false;
    let playing = false;

    if (trackId && sameId(id, trackId)) {
      active = true;
      if (playState === 'playing') {
        playing = true;
      }
    }

    return {
      active,
      playing,
    };
  };

  return { youtubePlayerState, currentTrack: youtubePlayerState.trackId, trackStatus, resume, pause, play, stop };
};
