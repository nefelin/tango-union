import { SimpleTrack } from '../../../../generated/graphql';
import { CompactTrack, ListId, TrackList } from '../../../types/compactTrack/types';

export interface Playlist {
  id: PlaylistId;
  label?: string;
  tracks: TrackList;
  selection: Set<ListId>;
  readOnly: boolean;
}

export type PlaylistId = string;

export type PlaylistTrack = SimpleTrack & CompactTrack;
