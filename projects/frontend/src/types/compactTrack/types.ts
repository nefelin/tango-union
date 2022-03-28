import { SimpleTrack } from '../../../generated/graphql';

export type ListId = string;
export type TrackId = SimpleTrack['id'];
export type VideoId = string;

export const delimiter = '-';
type Delimiter = typeof delimiter;

type MaybeVideoId = `${Delimiter}${VideoId}` | '';

export type CompoundIdString = `${ListId}${Delimiter}${TrackId}${MaybeVideoId}`;

export interface CompactTrack {
  listId: ListId; // this is the only guaranteed unique id on this object, rename?
  trackId: TrackId;
  videoId?: VideoId;
}

export type TrackList = Array<CompactTrack>;