import { Maybe } from '../../../types/maybe';

export interface YoutubePlayerState {
  trackId: Maybe<number>;
  playState: PlayState;
  playFocus: PlayFocusSource;
}

export type PlayState = 'playing' | 'stopped' | 'loading';
export type PlayFocusSource = string;

export interface TrackStatus {
  active: boolean;
  playing: boolean;
}

export interface HookProps {
  youtubePlayerState: YoutubePlayerState;
  stop: VoidFunction;
  pause: VoidFunction;
  resume: VoidFunction;
  play: (id: number, source: PlayFocusSource) => void;
  trackStatus: (id: number, source: PlayFocusSource) => TrackStatus;
}
