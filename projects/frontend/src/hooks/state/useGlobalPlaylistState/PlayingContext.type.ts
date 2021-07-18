import { PlaylistId, TrackIdTuple } from '../usePlaylistsState/types';

export interface PlayingContext {
  currentTrack?: TrackIdTuple;
  previousTrack?: TrackIdTuple;
  nextTrack?: TrackIdTuple;
  playlistId?: PlaylistId;
  trackIndex?: number;
}