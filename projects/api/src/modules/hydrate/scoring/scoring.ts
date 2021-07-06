import * as r from 'ramda';

import { flagFields, flagWeights, TrackFlags } from './types';
import { cleanSlop } from '../../../util/slop';
import { TrackDocument } from '../../../schemas/tracks.entity';
import { ensureString, signifiesBlankValue } from './util';
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

const flagMissing = (track: TrackDocument, index: number): TrackFlags => {
  const { title = '', description = '' } = track.youtube.links[index];
  const textFields = [title, description];
  const corpus = cleanSlop(textFields.join(' '));

  const basicCheck: TrackFlags = r.mapObjIndexed(
    (val) =>
      signifiesBlankValue(ensureString(val as any)) ? null : corpus.includes(cleanSlop(ensureString(val as any))),
    r.pick(flagFields, track || {}),
  );

  const dualTitle = track?.title.split('|').map(cleanSlop) ?? [];
  const titleFound =
    track?.title && dualTitle.length > 1 ? r.any((title) => corpus.includes(title), dualTitle) : basicCheck['title'];

  return { ...basicCheck, title: titleFound };
};

export const scoreTrack = (track: TrackDocument, index: number): Maybe<number> => {
  if (!track.youtube.links[index]) {
    return null;
  }
  return scoreTrackMatch(flagMissing(track, index));
};
