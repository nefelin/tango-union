import { nanoid } from 'nanoid';

import { Playlist } from '../usePlaylistsState/types';
import { PlayingContext } from './PlayingContext.type';

export const newSongList = (id: string): Playlist => ({
  id,
  tracks: [],
  selection: new Set(),
  readOnly: false,
});

export const generatePlaylistId = () => nanoid(8);

export type ListIdGenerator = (trackId: string) => string;
export const generateListId: ListIdGenerator = () =>
  nanoid(12).replace(/-/g, '');
export const generateListIdZeroRepeats: ListIdGenerator = (id) => 'l' + id;

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
