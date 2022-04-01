import { SimpleTrack } from '../../../generated/graphql';

export type ListId = string;
export type TrackId = SimpleTrack['id'];
export type VideoId = string;

export const delimiter = '-';
type Delimiter = typeof delimiter;

type MaybeVideoId = `${Delimiter}${VideoId}` | '';

export type CompoundIdString = `${ListId}${Delimiter}${TrackId}${MaybeVideoId}`;

/** CompactTrack is meant to hold track info in contexts with the following priorities:
 *  - string representational (i.e. url params)
 *  - brevity (anywhere we don't want full track info)
 *  - distinguishable ordered duplicates allowed
 *  - optionally specific video link specified
**/

export interface CompactTrack {
  listId: ListId; // this is the only guaranteed unique id on this object, rename?
  trackId: TrackId;
  videoId?: VideoId;
}

export type TrackList = Array<CompactTrack>;