import { Track } from './schemas/Track';
import { TangoTrack } from './types';
import * as r from 'ramda';

export const removeSearchIrrelevantTerms: (query: string) => string = r.replace(
  /((\s*unknown (male|female))|(unknown (male|female)\s*))/gi,
  '',
);

export const queryStringFromSong: (song: Track | TangoTrack) => string = r.pipe(
  r.pick(['orchestra', 'singer', 'genre', 'year', 'title']),
  Object.values,
  r.flatten,
  r.join(' '),
  removeSearchIrrelevantTerms,
);
