import { makeVar, useReactiveVar } from '@apollo/client';
import { nanoid } from 'nanoid';
import * as r from 'ramda';
import { useEffect, useState } from 'react';

import { Playlist, PlaylistId, TrackIdTuple } from './usePlaylistsState/types';
import { useYoutubePlayerState } from './useYoutubePlayerState';

const newSongList = (id: string): Playlist => ({
  id,
  tracks: [],
});

const generatePlaylistId = () => nanoid(8);
const generateLocalSongId = () => nanoid(12);

type ListState = Record<string, Playlist>;

const reactiveSongLists = makeVar<ListState>({});

export const usePlaylistsState = (listId: PlaylistId) => {
  const lists = useReactiveVar(reactiveSongLists);
  const thisList = lists[listId] || newSongList(listId);

  const addTracks = r.curry((newIds: Array<string>) => {
    const tracksWithLocalIds: Array<TrackIdTuple> = newIds.map((id) => [
      id,
      generateLocalSongId(),
    ]);

    const newList: Playlist = {
      ...thisList,
      tracks: [...thisList.tracks, ...tracksWithLocalIds],
    };
    reactiveSongLists({ ...lists, [listId]: newList });
  });

  const removeTrack = r.curry((id: string) => {
    const newTracks = thisList.tracks.filter(([_, localId]) => localId !== id);

    reactiveSongLists({
      ...lists,
      [listId]: { ...thisList, tracks: newTracks },
    });
  });

  const replaceTracks = (ids: Array<string>) => {
    const tracksWithLocalIds: Array<TrackIdTuple> = ids.map((id) => [
      id,
      generateLocalSongId(),
    ]);

    reactiveSongLists({
      ...lists,
      [listId]: { ...thisList, tracks: tracksWithLocalIds },
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

interface PlayingContext {
  currentTrack?: TrackIdTuple;
  previousTrack?: TrackIdTuple;
  nextTrack?: TrackIdTuple;
  playlistId?: PlaylistId;
  trackIndex?: number;
}

const initContext: PlayingContext = {};

export const useGlobalPlaylistsState = () => {
  const lists = useReactiveVar(reactiveSongLists);
  const { currentTrack } = useYoutubePlayerState();
  const [context, setContext] = useState<PlayingContext>(initContext);

  useEffect(() => {
    if (!currentTrack) {
      setContext(initContext);
      return;
    }

    Object.values(lists).some((playlist) => {
      const index = playlist.tracks.findIndex(
        (idTuple) => idTuple === currentTrack,
      );
      if (index !== -1) {
        setContext(createContext(playlist, index));
        return true;
      }
      return false;
    });
  }, [currentTrack]);

  return {
    context,
  };
};

const createContext = (
  { id, tracks }: Playlist,
  index: number,
): PlayingContext => ({
  playlistId: id,
  currentTrack: tracks[index],
  previousTrack: index > 0 ? tracks[index - 1] : undefined,
  nextTrack: index < tracks.length - 1 ? tracks[index + 1] : undefined,
  trackIndex: index,
});
