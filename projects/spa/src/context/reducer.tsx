import * as r from 'ramda';
import * as React from 'react';
import { FunctionComponent, useEffect, useReducer } from 'react';
import { useDebounce } from 'use-debounce';

import {
  compoundSearchOptsFromSearchbarState,
  SearchbarState,
} from '../components/Searchbar/Searchbar';
import { emptySelectOptions } from '../indexer/categoryIndex';
import { songSearcher } from '../indexer/indexer';
import { IndexedSongData, RawSong } from '../indexer/types';
import { YTDItem } from '../shared/youtubeTypes';
import { Action } from './actions';
import { initialState, store, StoreState, YoutubeSnippetMeta } from './store';

const { Provider } = store;

export const StateProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state: StoreState, action: Action): StoreState => {
      switch (action.type) {
        case 'pause':
          return { ...state, playing: 'paused' };
        case 'playFromTrackId':
          return { ...state, nowPlayingId: action.id, playing: 'playing' };
        case 'setSearch':
          return { ...state, searchbarState: action.criteria };
        case 'setSearchResults':
          return {
            ...state,
            searchedSongs: action.results.songs,
            selectOptions: action.results.filteredSelectOptions,
          };
        case 'resetSearch':
          return {
            ...state,
            searchedSongs: state.index?.songs ?? [],
            selectOptions: state.searcher?.selectOptions ?? emptySelectOptions,
          };
        case 'loadPlayer':
          return { ...state, youtubePlayer: action.player };
        case 'setPlayState':
          return { ...state, playing: action.playState };
        case 'trackEnd':
          // play next song if there are any
          return state;
        case 'loadIndex':
          const searcher = songSearcher(action.index);
          return {
            ...state,
            index: action.index,
            searcher,
            searchedSongs: action.index.songs,
            selectOptions: searcher.selectOptions,
          };
        default:
          assertUnreachable(action);
      }
    },
    initialState,
  );

  // debounce and update results when criteria change
  const [searchState] = useDebounce(state.searchbarState, 200);
  const { searcher, index } = state;
  useEffect(() => {
    if (searcher && index) {
      if (searchbarIsEmpty(searchState)) {
        dispatch({
          type: 'resetSearch',
        });
      } else {
        const searchOpts = compoundSearchOptsFromSearchbarState(searchState);
        const results = searcher.compoundSearch(searchOpts);
        dispatch({ type: 'setSearchResults', results });
      }
    }
  }, [searchState, searcher, state.index]);

  return <Provider value={{ ...state, dispatch }}>{children}</Provider>;
};

function assertUnreachable(x: never): never {
  throw new Error("Didn't expect to get here");
}

const searchbarIsEmpty = (state: SearchbarState): boolean =>
  r.either(r.isNil, r.isEmpty)(state.genre) &&
  r.either(r.isNil, r.isEmpty)(state.orchestra) &&
  r.either(r.isNil, r.isEmpty)(state.singer) &&
  r.either(r.isNil, r.isEmpty)(state.search);

const queryStringFromSong: (song: RawSong) => string = r.pipe(
  r.pick(['orchestra', 'singer', 'genre', 'year', 'title']),
  Object.values,
  r.map(r.flatten),
  r.join(' '),
  r.replace(/unknown/i, ''),
);

const youtubeMetaFromYTDItem = (item: YTDItem): YoutubeSnippetMeta => ({
  videoId: item.id.videoId,
  title: item.snippet.title,
  description: item.snippet.description,
});
