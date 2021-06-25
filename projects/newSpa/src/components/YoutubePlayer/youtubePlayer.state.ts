import { makeVar } from '@apollo/client';

import type { Maybe } from '../../types';

interface YoutubePlayerState {
  trackId: Maybe<number>;
  playState: PlayState;
}

export type PlayState = 'playing' | 'stopped' | 'loading';

const initYoutubePlayerState: YoutubePlayerState = {
  trackId: null,
  playState: 'stopped'
};

export const reactiveYoutubePlayerState = makeVar(initYoutubePlayerState);

export const playerStop = () => reactiveYoutubePlayerState({...reactiveYoutubePlayerState(), playState: 'stopped'});
export const playerPause = () => reactiveYoutubePlayerState({...reactiveYoutubePlayerState(), playState: 'stopped'});
export const playerPlay = () => reactiveYoutubePlayerState({...reactiveYoutubePlayerState(), playState: 'playing'});

export const playTrackId = (trackId: number) => reactiveYoutubePlayerState({...reactiveYoutubePlayerState(), playState: 'loading', trackId});