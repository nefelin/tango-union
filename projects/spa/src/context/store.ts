import { createContext } from 'react';
import { YouTubePlayer } from 'youtube-player/dist/types';

import { SearchbarState } from '../components/Searchbar/Searchbar';
import { SelectOptions } from '../indexer/categoryIndex';
import { IndexInterface, songSearcher } from '../indexer/indexer';
import { IndexedSongData, RawSong, TrackId } from '../indexer/types';
import { Maybe } from '../shared/types';
import { YTDItem } from '../shared/youtubeTypes';
import { Action } from './actions';

export type PlayState = 'playing' | 'paused' | 'stopped';

export interface YoutubeSnippetMeta {
  videoId: string;
  title: string;
  description: string;
}

export type Playable = { libMeta: RawSong; youtubeMeta: YoutubeSnippetMeta };

export interface StoreState {
  playing: PlayState;
  nowPlayingId: Maybe<TrackId>;
  searchbarState: SearchbarState;
  dispatch: (a: Action) => void;
  index: IndexedSongData;
  searcher: IndexInterface;
  selectOptions: SelectOptions;
  searchedSongs: RawSong[];
  search: YoutubeSearcher;
  youtubePlayer: Maybe<YouTubePlayer>;
}

const initIndex: IndexedSongData = {
  songs: [],
  selectIndex: {
    singer: {},
    orchestra: {},
    genre: {},
  },
};

const initSearcher = songSearcher(initIndex);

export const initialState: StoreState = {
  youtubePlayer: null,
  playing: 'stopped',
  nowPlayingId: null,
  searchbarState: {
    search: '',
    orchestra: [],
    singer: [],
    genre: [],
  },
  dispatch: () => {},
  index: initIndex,
  searcher: initSearcher,
  selectOptions: initSearcher.selectOptions,
  searchedSongs: initIndex.songs,
  search: () => Promise.resolve(null),
};

export type YoutubeSearcher = (query: string) => Promise<Maybe<YTDItem[]>>;

export const store = createContext(initialState);
