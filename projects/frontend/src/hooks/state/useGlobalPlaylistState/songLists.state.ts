import { makeVar } from '@apollo/client';

import { ListId } from '../../../types/CompactTrack';
import { Playlist, PlaylistId } from '../usePlaylistsState/types';

type ListState = Record<PlaylistId, Playlist>;

export const reactiveSongLists = makeVar<ListState>({});

export const playlistIdFromListId = (searchListId: ListId) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const [playlistId, playlist] of Object.entries(reactiveSongLists())) {
    if (playlist.tracks.find(({ listId }) => listId === searchListId)) {
      return playlistId;
    }
  }
  return null;
};
