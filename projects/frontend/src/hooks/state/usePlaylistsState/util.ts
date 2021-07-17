import { PlaylistTrack, TrackIdTuple } from './types';

export const tupleIdFromPlaylistTrack = (track: PlaylistTrack): TrackIdTuple => [track.id, track.localSongId];

export const sameId = (one: TrackIdTuple, two: TrackIdTuple) => one[0] === two[0] && one[1] === two[1];