import { SimpleTrack } from '../../../../generated/graphql';

export interface Playlist {
  id: PlaylistId;
  label?: string;
  tracks: Array<TrackIdTuple>;
  selection: Array<LocalSongId>;
}

export type LocalSongId = string; // an id that identifies a song as a unique instance, used to differentiate between duplicates in the same list or the same track on different lists
export type PlaylistId = string;

export type SongId = SimpleTrack['id']
export type TrackIdTuple = [SongId, LocalSongId]; // format used to store tracks in the url playlist

export type PlaylistTrack = SimpleTrack & { localSongId: LocalSongId };
