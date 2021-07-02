import { Track } from './schemas/tracks.entity';
import * as r from 'ramda';

export const removeSearchIrrelevantTerms: (query: string) => string = r.replace(
  /((\s*unknown (male|female))|(unknown (male|female)\s*))/gi,
  '',
);

export const queryStringFromSong: (song: Track) => string = r.pipe( // fixme this is broken since added things like Unknown and Instrumental to the core data, be sure to remove those null values before searching...
  r.pick(['orchestra', 'singer', 'year', 'title']),
  Object.values,
  r.flatten,
  r.join(' '),
  removeSearchIrrelevantTerms,
);
