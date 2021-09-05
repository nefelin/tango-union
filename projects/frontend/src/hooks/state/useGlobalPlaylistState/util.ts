import { nanoid } from 'nanoid';

import { Playlist } from '../usePlaylistsState/types';
import { PlayingContext } from './PlayingContext.type';

export const newSongList = (id: string): Playlist => ({
  id,
  tracks: [],
  selection: new Set()
});

export const generatePlaylistId = () => nanoid(8);
export const generateListId = () => nanoid(12);

export const createContext = (
  { id, tracks }: Playlist,
  index: number,
): PlayingContext => ({
  playlistId: id,
  currentTrack: tracks[index],
  previousTrack: index > 0 ? tracks[index - 1] : undefined,
  nextTrack: index < tracks.length - 1 ? tracks[index + 1] : undefined,
  trackIndex: index,
});
