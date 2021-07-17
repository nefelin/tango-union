import { Maybe } from '../../../types/utility/maybe';

export interface YoutubePlayerState {
  trackId: Maybe<string>;
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
  play: (id: string, source: PlayFocusSource) => void;
  trackStatus: (id: string, source: PlayFocusSource) => TrackStatus;
}
