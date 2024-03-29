import { TrackDetailFragmentFragment } from '../../../generated/graphql';
import { reactiveSongLists } from '../../hooks/state/useGlobalPlaylistState/songLists.state';
import {
  generateListId,
  ListIdGenerator,
} from '../../hooks/state/useGlobalPlaylistState/util';
import { PlaylistTrack } from '../../hooks/state/usePlaylistsState/types';
import {
  CompactTrack,
  CompoundIdString,
  delimiter,
  ListId,
  TrackId,
} from './types';

export const compactTrackFromString = (s: CompoundIdString): CompactTrack => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
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

export const compactTrackFromTrackId =
  (listIdGenerator = generateListId) =>
  (id: TrackId): CompactTrack => ({
    listId: listIdGenerator(id),
    trackId: id,
  });

export const playlistTrackFromTrack = (listIdGenerator = generateListId) => (
  track: TrackDetailFragmentFragment,
): PlaylistTrack => ({
  ...compactTrackFromTrackId(listIdGenerator)(track.id),
  ...track,
});

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

export const regenListIds = (track: CompactTrack) => ({
  ...track,
  listId: generateListId(track.trackId),
});

export const compactTrackFromListId = (listId: ListId) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const list of Object.values(reactiveSongLists())) {
    // eslint-disable-next-line no-restricted-syntax
    for (const track of list.tracks) {
      if (track.listId === listId) {
        return track;
      }
    }
  }
  return null;
};
