import * as r from 'ramda';

import { SimpleTrack, TrackDetailFragmentFragment } from '../../../../generated/graphql';
import { Maybe } from '../../../types/utility/maybe';
import { cleanSlop } from '../../../util/cleanSlop';
import { flagFields, flagWeights, TrackFlags } from './types';
import { ensureSingleString, signifiesBlankValue } from './util';

export const scoreTrackMatch = (flags: TrackFlags): number => {
  const scored = r.mapObjIndexed((flag, key) => {
    if (flags[key] === null) {
      return Math.floor(flagWeights[key] / 2); // half points for nullish values ('Instrumental' singer and 'Unknown' orchestra)
    }
    return flags[key] ? flagWeights[key] : 0;
  }, flagWeights);

  return Object.values<number>(scored).reduce((prev, curr) => prev + curr, 0);
};

export const flagMissing = (
  texts: Array<string>,
  track: Maybe<TrackDetailFragmentFragment>,
): TrackFlags => {
  const corpus = cleanSlop(texts.join(' '));

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
