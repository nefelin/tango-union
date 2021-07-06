import { Maybe } from '../../../types';

export const flagFields = ['title', 'orchestra', 'singer', 'year', 'genre'] as const;
export type FlagKeys = typeof flagFields[number];
export type TrackFlags = Partial<Record<FlagKeys, Maybe<boolean>>>;
export type FlagWeights = Record<FlagKeys, number>;

export const flagWeights: FlagWeights = {
  title: 4,
  orchestra: 3,
  singer: 2,
  year: 1,
  genre: 0,
};

export const maxScore = Object.values<number>(flagWeights).reduce((prev, curr) => prev + curr, 0);

export const goodScoreThreshold = 0.6;
