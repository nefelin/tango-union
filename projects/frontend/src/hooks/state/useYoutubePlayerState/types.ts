import { CompactTrack } from '../../../types/compactTrack/types';
import { Maybe } from '../../../types/utility/maybe';
import { PlaylistTrack } from '../usePlaylistsState/types';

export interface YoutubePlayerState {
  activeTrack: Maybe<CompactTrack>;
  playState: PlayState;
}

export type PlayState = 'playing' | 'stopped' | 'loading';

export interface TrackStatus {
  active: boolean;
  playing: boolean;
}

export interface HookProps {
  currentTrack: Maybe<CompactTrack>;
  youtubePlayerState: YoutubePlayerState;
  stop: VoidFunction;
  pause: VoidFunction;
  resume: VoidFunction;
  play: (id: CompactTrack) => void;
  trackStatus: (track: PlaylistTrack) => TrackStatus;
}
