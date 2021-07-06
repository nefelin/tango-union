import * as r from 'ramda';

import { flagFields, flagWeights, TrackFlags } from './types';
import { cleanSlop } from '../../../util/slop';
import { TrackDocument } from '../../../schemas/tracks.entity';
import { ensureSingleString, signifiesBlankValue } from './util';
import { Maybe } from '../../../types';

const scoreTrackMatch = (flags: TrackFlags): number => {
  const scored = r.mapObjIndexed((flag, key) => {
    if (flags[key] === null) {
      return Math.floor(flagWeights[key] / 2); // half points for nullish values ('Instrumental' singer and 'Unknown' orchestra)
    }
    return flags[key] ? flagWeights[key] : 0;
  }, flagWeights);

  return Object.values<number>(scored).reduce((prev, curr) => prev + curr, 0);
};

const flagMissing = (trackDoc: TrackDocument, index: number): TrackFlags => {
  const track = trackDoc.toObject();
  const { title = '', description = '' } = track.youtube.links[index];
  const textFields = [title, description];
  const corpus = cleanSlop(textFields.join(' '));

  const checkerObj = {};

  const multiTitle = track?.title.split('|') ?? [];
  const trackWithArrayedTitle = {
    ...track,
    title: multiTitle.length > 1 ? multiTitle : track?.title,
  };

  const flaggableTrack = r.pick(flagFields, trackWithArrayedTitle || {});
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(flaggableTrack)) {
    if (r.isNil(value)) {
      // do nothing
    } else if (typeof value === 'string' && signifiesBlankValue(value)) {
      checkerObj[key] = null;
    } else if (Array.isArray(value)) {
      let found = false;
      value.forEach((term) => {
        if (corpus.includes(cleanSlop(ensureSingleString(term)))) {
          found = true;
        }
      });
      checkerObj[key] = found;
    } else if (typeof value === 'string' || typeof value === 'number') {
      checkerObj[key] = corpus.includes(cleanSlop(ensureSingleString(value)));
    } else {
      checkerObj[key] = false;
    }
  }

  return checkerObj;
};

export const scoreTrack = (track: TrackDocument, index: number): Maybe<number> => {
  if (!track.youtube.links[index]) {
    return null;
  }
  return scoreTrackMatch(flagMissing(track, index));
};
