import { SimpleTrack } from '../../generated/graphql';

export type PlaylistId = string; // an id that identifies a song as a unique instance, used to differentiate between duplicates in the same list or the same track on different lists

export type RouteListTrack = [SimpleTrack['id'], PlaylistId]; // format used to store tracks in the url playlist

export type PlaylistTrack = SimpleTrack & {listId: PlaylistId}