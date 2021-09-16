import { makeVar } from '@apollo/client';

import { ListId } from '../../../types/compactTrack/types';
import { Playlist, PlaylistId } from '../usePlaylistsState/types';
import { newSongList } from './util';

type ListState = Record<PlaylistId, Playlist>;
export const RESULTS_PLAYLIST_ID = 'results';
export const QUICKLIST_PLAYLIST_ID = 'quicklist';

export const reactiveSongLists = makeVar<ListState>({
  [RESULTS_PLAYLIST_ID]: {...newSongList(RESULTS_PLAYLIST_ID), readOnly: true},
  [QUICKLIST_PLAYLIST_ID]: {...newSongList(QUICKLIST_PLAYLIST_ID), readOnly: false},
});

export const playlistIdFromListId = (searchListId: ListId) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const [playlistId, playlist] of Object.entries(reactiveSongLists())) {
    if (playlist.tracks.find(({ listId }) => listId === searchListId)) {
      return playlistId;
    }
  }
  return null;
};

export const deleteSelectedTracks = (playListId: PlaylistId) => {
  const playlist = reactiveSongLists()[playListId];
  if (!playlist || playlist.readOnly) {
    return;
  }
  reactiveSongLists({
    ...reactiveSongLists(),
    [QUICKLIST_PLAYLIST_ID]: {
      ...playlist,
      tracks: playlist.tracks.filter(({listId}) => !playlist.selection.has(listId)),
    },
  });
}
