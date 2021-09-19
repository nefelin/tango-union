import { reactiveSongLists } from '../../hooks/state/useGlobalPlaylistState/songLists.state';
import { generateListId } from '../../hooks/state/useGlobalPlaylistState/util';
import { PlaylistTrack } from '../../hooks/state/usePlaylistsState/types';
import {
  CompactTrack,
  CompoundIdString,
  delimiter,
  ListId,
  TrackId,
} from './types';

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

export const compactTrackFromTrackId = (id: TrackId): CompactTrack => ({
  listId: generateListId(),
  trackId: id,
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
  listId: generateListId(),
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
