import { useReactiveVar } from '@apollo/client';
import * as r from 'ramda';

import { reactiveSongLists } from './useGlobalPlaylistState/songLists.state';
import {
  generateLocalSongId,
  newSongList,
} from './useGlobalPlaylistState/util';
import { Playlist, PlaylistId, TrackIdTuple } from './usePlaylistsState/types';

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

  const removeTrack = (id: string) => {
    const prevList = reactiveSongLists()[listId] || newSongList(listId);
    const newTracks = prevList.tracks.filter(([_, localId]) => localId !== id);

    reactiveSongLists({
      ...reactiveSongLists(),
      [listId]: { ...prevList, tracks: newTracks },
    });
  };

  const replaceTracks = (ids: Array<string>) => {
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

  return {
    tracks: thisList.tracks,
    addTracks,
    removeTrack,
    // removeIndex <-- FixME
    replaceTracks,
  };
};
