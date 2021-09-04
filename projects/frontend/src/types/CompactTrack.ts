import { SimpleTrack } from '../../generated/graphql';
import { PlaylistTrack } from '../hooks/state/usePlaylistsState/types';

export type ListId = string;
export type TrackId = SimpleTrack['id'];
export type VideoId = string;

const delimiter = '-';
type Delimiter = typeof delimiter;

type MaybeVideoId = `${Delimiter}${VideoId}` | '';
const maybeVideoId = (videoId?: string) =>
  videoId ? `${delimiter}${videoId}` : '';

export type CompoundIdString = `${ListId}${Delimiter}${TrackId}${MaybeVideoId}`;

export interface CompactTrack {
  listId: ListId; // this is the only guaranteed unique id on this object, rename?
  trackId: TrackId;
  videoId?: VideoId;
}

export const compactTrackFromString = (s: CompoundIdString): CompactTrack => {
  const [listId, trackId, videoId] = s.split(delimiter) as [
    string,
    string,
    string | undefined,
  ];
  return {
    listId,
    trackId,
    videoId,
  };
};

export const compoundIdStringFromCompactTrack = ({
  listId,
  trackId,
  videoId,
}: CompactTrack): CompoundIdString =>
  videoId
    ? (`${listId}${delimiter}${trackId}${delimiter}${videoId}` as const)
    : (`${listId}${delimiter}${trackId}` as const);

export const compressTrack = ({
  listId,
  videoId,
  id,
}: PlaylistTrack): CompactTrack => ({
  listId,
  trackId: id,
  videoId,
});

export type TrackList = Array<CompactTrack>;

// export class TrackList extends Array<CompactTrack> {
//   byId(id: ListId) {
//     return this.find(({ listId }) => id === listId);
//   }
//
//   indexById(id: ListId) {
//     return this.findIndex(({ listId }) => id === listId);
//   }
//
//   insertedAt(index: number, ...tracks: Array<CompactTrack>) {
//     if (index > this.length - 1) {
//       throw new Error('Index out of range on TrackList');
//     }
//
//     const beforeInsert = this.slice(0, index);
//     const afterInsert =
//       index === this.length ? [] : this.slice(index, this.length);
//
//     return [...beforeInsert, ...tracks, ...afterInsert];
//   }
//
//   removed(...ids: Array<ListId>) {
//     return this.filter(({ listId }) => ids.includes(listId));
//   }
// }
