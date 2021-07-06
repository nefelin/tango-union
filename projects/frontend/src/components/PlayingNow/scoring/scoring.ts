import * as r from 'ramda';

import { SimpleTrack } from '../../../../generated/graphql';
import { Maybe } from '../../../types';
import { cleanSlop } from '../../../util/cleanSlop';
import { flagFields, flagWeights, TrackFlags } from './types';
import { ensureString, signifiesBlankValue } from './util';

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
  track: Maybe<SimpleTrack>,
): TrackFlags => {
  const corpus = cleanSlop(texts.join(' '));

  const basicCheck: TrackFlags = r.mapObjIndexed(
    (val) =>
      signifiesBlankValue(ensureString(val as any))
        ? null
        : corpus.includes(cleanSlop(ensureString(val as any))),
    r.pick(flagFields, track || {}),
  );

  const dualTitle = track?.title.split('|').map(cleanSlop) ?? [];
  const titleFound =
    track?.title && dualTitle.length > 1
      ? r.any((title) => corpus.includes(title), dualTitle)
      : basicCheck['title'];

  return { ...basicCheck, title: titleFound };
};
