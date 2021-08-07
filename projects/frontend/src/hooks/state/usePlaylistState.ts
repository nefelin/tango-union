import { useReactiveVar } from '@apollo/client';
import * as r from 'ramda';

import { reactiveSongLists } from './useGlobalPlaylistState/songLists.state';
import {
  generateLocalSongId,
  newSongList,
} from './useGlobalPlaylistState/util';
import { LocalSongId, Playlist, PlaylistId, SongId, TrackIdTuple } from './usePlaylistsState/types';

export const usePlaylistState = (listId: PlaylistId) => {
  const lists = useReactiveVar(reactiveSongLists);
  const thisList = reactiveSongLists()[listId] || newSongList(listId); // this is okay for returning tracks but cannot be used in functions as it can lead to race conditions

  const addTracks = r.curry((newIds: Array<string>) => {
    const tracksWithLocalIds: Array<TrackIdTuple> = newIds.map((id) => [
      id,
      generateLocalSongId(),
    ]);

    const prevList = reactiveSongLists()[listId] || newSongList(listId);
    const newList: Playlist = {
      ...prevList,
      tracks: [...prevList.tracks, ...tracksWithLocalIds],
    };
    reactiveSongLists({ ...lists, [listId]: newList });
  });

  const removeTracks = (...ids: Array<LocalSongId>) => {
    const prevList = reactiveSongLists()[listId] || newSongList(listId);
    const newTracks = prevList.tracks.filter(([_, localId]) => !ids.includes(localId));

    reactiveSongLists({
      ...reactiveSongLists(),
      [listId]: { ...prevList, tracks: newTracks },
    });
  };

  const replaceTracks = (ids: Array<SongId>) => {
    const prevList = reactiveSongLists()[listId] || newSongList(listId);

    const tracksWithLocalIds: Array<TrackIdTuple> = ids.map((id) => [
      id,
      generateLocalSongId(),
    ]);

    reactiveSongLists({
      ...reactiveSongLists(),
      [listId]: { ...prevList, tracks: tracksWithLocalIds },
    });
  };

  const rearrangeTracks = (ids: Array<TrackIdTuple>) => {
    const prevList = reactiveSongLists()[listId] || newSongList(listId);

    reactiveSongLists({
      ...reactiveSongLists(),
      [listId]: { ...prevList, tracks: ids },
    });
  }

  return {
    tracks: thisList.tracks,
    addTracks,
    removeTracks,
    replaceTracks,
    rearrangeTracks,
  };
};
