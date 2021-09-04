import { CompactTrack } from '../../../types/CompactTrack';
import { PlaylistId } from '../usePlaylistsState/types';

export interface PlayingContext {
  currentTrack?: CompactTrack;
  previousTrack?: CompactTrack;
  nextTrack?: CompactTrack;
  playlistId?: PlaylistId;
  trackIndex?: number;
}
