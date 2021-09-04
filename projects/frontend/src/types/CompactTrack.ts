import { PlaylistTrack } from '../hooks/state/usePlaylistsState/types';

type ListId = string;
type TrackId = string;
type VideoId = string;

const delimiter = '-';
type Delimiter = typeof delimiter;

type MaybeVideoId = `${Delimiter}${VideoId}` | '';

export type CompoundIdString = `${ListId}${Delimiter}${TrackId}${MaybeVideoId}`;

export interface CompactTrack {
  listId: ListId;
  trackId: TrackId;
  videoId?: VideoId;
}

export const compoundIdFromString = (s: CompoundIdString): CompactTrack => {
  const [listId, trackId, videoId] = s.split(delimiter) as [string, string, string | undefined];
  return {
    listId,
    trackId,
    videoId
  }
}

export const compoundIdFromTrack = ({localSongId, id}: PlaylistTrack): CompactTrack => ({
  listId: localSongId,
  trackId: id,
})