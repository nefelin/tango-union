import { YouTubePlayer } from 'youtube-player/dist/types';

import { SearchbarState } from '../components/Searchbar/Searchbar';
import { HydratedCompoundSearchResults } from '../indexer/indexer';
import { IndexedSongData, TrackId } from '../indexer/types';
import { Maybe } from '../shared/types';
import { Playable, PlayState, YoutubeSearcher } from './store';

type PlayAction = {
  type: 'play';
  playable: Playable;
};

type SetPlayState = {
  type: 'setPlayState';
  playState: PlayState;
};

type TrackEnd = {
  type: 'trackEnd';
};

type Pause = {
  type: 'pause';
};

type PlayFromTrackId = {
  type: 'playFromTrackId';
  id: TrackId;
};

type SetSearch = {
  type: 'setSearch';
  criteria: SearchbarState;
};

type SetSearchResults = {
  type: 'setSearchResults';
  results: HydratedCompoundSearchResults;
};

type ResetSearchInterface = {
  type: 'resetSearch';
};

type LoadPlayer = {
  type: 'loadPlayer';
  player: YouTubePlayer;
};

type LoadIndex = {
  type: 'loadIndex';
  index: IndexedSongData;
};

export type Action =
  | LoadIndex
  | SetPlayState
  | Pause
  | PlayFromTrackId
  // | PlayAction
  | SetSearch
  | SetSearchResults
  | ResetSearchInterface
  | LoadPlayer
  | TrackEnd;
