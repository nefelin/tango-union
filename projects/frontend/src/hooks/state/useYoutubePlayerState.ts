import { makeVar, useReactiveVar } from '@apollo/client';

import {
  HookProps,
  PlayFocusSource, TrackStatus,
  YoutubePlayerState,
} from './useYoutubePlayerState/types';

const initYoutubePlayerState: YoutubePlayerState = {
  trackId: null,
  playState: 'stopped',
  playFocus: 'search',
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

  const play = (trackId: number, playFocus: PlayFocusSource) => {
    const currentState = reactiveYoutubePlayerState();
    const newTrack = trackId !== currentState.trackId;
    const playState = newTrack ? 'loading' : 'playing';

    reactiveYoutubePlayerState({
      ...currentState,
      playState,
      trackId,
      playFocus,
    });
  };

  const trackStatus = (id: number, source: PlayFocusSource): TrackStatus => {
    const { trackId, playState, playFocus } = youtubePlayerState;
    let active = false;
    let playing = false;

    if (trackId === id && playFocus === source) {
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

  return { youtubePlayerState, trackStatus, resume, pause, play, stop };
};
