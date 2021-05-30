import type { SelectIndex } from './categoryIndex';
import type {Maybe} from '../shared/types';

export interface RawSong {
  genre: Maybe<string>;
  secondsLong: Maybe<number>;
  title: string;
  orchestra: Maybe<Array<string>>;
  singer: Maybe<Array<string>>;
  _id: string;
  year: Maybe<number>;
}

interface SlopMeta {
  slop: string;
}

export type JustSlop = Pick<RawSong, '_id'> & SlopMeta;
export type JustYear = Pick<RawSong, '_id' | 'year'>;

export type TrackId = RawSong['_id'];

export interface IndexedSongData {
  songs: Array<RawSong & SlopMeta>;
  selectIndex: SelectIndex;
}
