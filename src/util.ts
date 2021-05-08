import { Track } from './schemas/tracks.entity';
import { TangoTrack } from './types';
import * as r from 'ramda';

export const removeSearchIrrelevantTerms: (query: string) => string = r.replace(
  /((\s*unknown (male|female))|(unknown (male|female)\s*))/gi,
  '',
);

export const queryStringFromSong: (song: Track) => string = r.pipe(
  r.pick(['orchestra', 'singer', 'year', 'title']),
  Object.values,
  r.flatten,
  r.join(' '),
  removeSearchIrrelevantTerms,
);
