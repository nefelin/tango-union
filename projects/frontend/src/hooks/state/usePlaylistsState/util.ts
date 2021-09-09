// import { Maybe } from '../../../types/utility/maybe';
// import { Playlist, PlaylistTrack, TrackIdTuple } from './types';

// export const tupleIdFromPlaylistTrack = (track: PlaylistTrack): TrackIdTuple => [track.id, track.localSongId];
//
// export const sameId = (one: Maybe<TrackIdTuple>, two: Maybe<TrackIdTuple>) => {
//   if (!one || !two) {
//     return false;
//   }
//   return one[0] === two[0] && one[1] === two[1];
// }
//
// export const localSongIdFromTrackIdTuple = (tuple: TrackIdTuple) => tuple[1];
//
import { CompactTrack } from '../../../types/compactTrack/types';
import { Playlist } from './types';

export const selectedTracks = (playlist: Playlist): Array<CompactTrack> => playlist.tracks.filter(({listId}) => playlist.selection.has(listId));