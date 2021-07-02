import { makeVar, useReactiveVar } from '@apollo/client';

import { Maybe } from '../../types';

interface YoutubePlayerState {
  trackId: Maybe<number>;
  playState: PlayState;
  playFocus: PlayFocusSource;
}

export type PlayState = 'playing' | 'stopped' | 'loading';
export type PlayFocusSource = string
export interface TrackStatus {
  active: boolean;
  playing: boolean;
}

const initYoutubePlayerState: YoutubePlayerState = {
  trackId: null,
  playState: 'stopped',
  playFocus: 'search',
};

export const reactiveYoutubePlayerState = makeVar(initYoutubePlayerState);

export const useTrackStatus = (
  id: number,
  source: PlayFocusSource,
): TrackStatus => {
  const { trackId, playState, playFocus } = useReactiveVar(
    reactiveYoutubePlayerState,
  );
  let active = false;
  let playing = false;

  if (trackId === id && playFocus === source) {
    active = true;
    if (playState === 'playing') {
      playing = true;
    }
  }

  return { active, playing };
};

export const playerStop = () =>
  reactiveYoutubePlayerState({
    ...reactiveYoutubePlayerState(),
    playState: 'stopped',
  });
export const playerPause = () =>
  reactiveYoutubePlayerState({
    ...reactiveYoutubePlayerState(),
    playState: 'stopped',
  });
export const playerPlay = () =>
  reactiveYoutubePlayerState({
    ...reactiveYoutubePlayerState(),
    playState: 'playing',
  });

export const playTrackId = (trackId: number, playFocus: PlayFocusSource) => {
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
