import { Maybe } from '../../../types/utility/maybe';
import { PlaylistTrack, TrackIdTuple } from '../usePlaylistsState/types';

export interface YoutubePlayerState {
  trackId: Maybe<TrackIdTuple>;
  playState: PlayState;
}

export type PlayState = 'playing' | 'stopped' | 'loading';

export interface TrackStatus {
  active: boolean;
  playing: boolean;
}

export interface HookProps {
  currentTrack: Maybe<TrackIdTuple>;
  youtubePlayerState: YoutubePlayerState;
  stop: VoidFunction;
  pause: VoidFunction;
  resume: VoidFunction;
  play: (id: TrackIdTuple) => void;
  trackStatus: (track: PlaylistTrack) => TrackStatus;
}
