import { TrackDocument } from '../schemas/tracks.entity';
import { slopFromSong } from './slop';

export const nGramsFromString = (str: string, minLen = 2, delimiter = '') => {
  const nGrams = [];
  for (const term of str.split(delimiter)) {
    let nGram = '';
    for (const char of term) {
      nGram += char;
      if (nGram.length >= minLen) {
        nGrams.push(nGram);
      }
    }
  }
  return nGrams.join(' ');
};

export const addNgramsToTrack = (track: TrackDocument) => {
  const textSlop = slopFromSong(track);
  track.searchGrams = nGramsFromString(textSlop);
  track.save();
}
