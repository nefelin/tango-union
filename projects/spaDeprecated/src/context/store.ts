import { createContext } from 'react';
import type { YouTubePlayer } from 'youtube-player/dist/types';

import type { SearchbarState } from '../components/Searchbar/Searchbar';
import type { SelectOptions } from '../indexer/categoryIndex';
import type { IndexInterface} from '../indexer/indexer';
import { songSearcher } from '../indexer/indexer';
import type { IndexedSongData, RawSong, TrackId } from '../indexer/types';
import type { Maybe } from '../shared/types';
import type { YTDItem } from '../shared/youtubeTypes';
import type { Action } from './actions';

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
  searchedSongs: Array<RawSong>;
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

export type YoutubeSearcher = (query: string) => Promise<Maybe<Array<YTDItem>>>;

export const store = createContext(initialState);
