import { useReactiveVar } from '@apollo/client';

import { CompactTrack, ListId, TrackId } from '../../types/compactTrack/types';
import { compactTrackFromTrackId } from '../../types/compactTrack/util';
import { reactiveSongLists } from './useGlobalPlaylistState/songLists.state';
import { generateListId, newSongList } from './useGlobalPlaylistState/util';
import { Playlist, PlaylistId } from './usePlaylistsState/types';

export const usePlaylistState = (playlistId: PlaylistId) => {
  const lists = useReactiveVar(reactiveSongLists);
  const thisList = reactiveSongLists()[playlistId] || newSongList(playlistId); // this is okay for returning tracks but cannot be used in functions as it can lead to race conditions

  const addTracks = (newIds: Array<string>, listIdGenerator = generateListId) => {
    const tracksWithLocalIds: Array<CompactTrack> = newIds.map(compactTrackFromTrackId(listIdGenerator));

    const prevList = reactiveSongLists()[playlistId] || newSongList(playlistId);
    const newList: Playlist = {
      ...prevList,
      tracks: [...prevList.tracks, ...tracksWithLocalIds],
    };
    reactiveSongLists({ ...lists, [playlistId]: newList });
  };

  const removeTracks = (...ids: Array<ListId>) => {
    const prevList = reactiveSongLists()[playlistId] || newSongList(playlistId);
    const newTracks = prevList.tracks.filter(
      ({ listId }) => !ids.includes(listId),
    );

    reactiveSongLists({
      ...reactiveSongLists(),
      [playlistId]: { ...prevList, tracks: newTracks },
    });
  };

  const loadTracks = (tracks: Array<CompactTrack>) => {
    // like replace tracks but takes compactTrack for loading from route for example
    const prevList = reactiveSongLists()[playlistId] || newSongList(playlistId);

    reactiveSongLists({
      ...reactiveSongLists(),
      [playlistId]: { ...prevList, tracks },
    });
  };

  const replaceTracks = (ids: Array<TrackId>, listIdGenerator = generateListId) => {
    const prevList = reactiveSongLists()[playlistId] || newSongList(playlistId);

    const tracksWithLocalIds: Array<CompactTrack> = ids.map((trackId) => ({
      trackId,
      listId: listIdGenerator(trackId),
    }));

    reactiveSongLists({
      ...reactiveSongLists(),
      [playlistId]: { ...prevList, tracks: tracksWithLocalIds },
    });
  };

  const rearrangeTracks = (ids: Array<CompactTrack>) => {
    const prevList = reactiveSongLists()[playlistId] || newSongList(playlistId);

    reactiveSongLists({
      ...reactiveSongLists(),
      [playlistId]: { ...prevList, tracks: ids },
    });
  };

  return {
    addTracks,
    removeTracks,
    loadTracks,
    replaceTracks,
    rearrangeTracks,
    playlist: thisList,
  };
};
