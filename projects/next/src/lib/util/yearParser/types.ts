import { Maybe } from '../../types';

type InternalYear = number;

export type YearFilter<UnknownYearType = null, YearType = InternalYear> = Set<YearType | UnknownYearType>;
export type ParseResult<UnknownYearType> = Maybe<Array<number | UnknownYearType>>;

export interface YearToken {
  kind: 'YEAR';
  value: InternalYear;
}

export interface RangeToken {
  kind: 'RANGE';
  value: 'SSUFFIX' | 'SPAN';
}

export interface InvalidToken {
  kind: 'INVALID';
  value: string;
}

export interface UnknownToken {
  kind: 'UNKNOWN';
}

export type Token = RangeToken | YearToken | UnknownToken | InvalidToken;

// fixme examples of valid terms intent here?
export const validYearTerms = /(\?|(?:(?:\d\d\d\d|\d\ds?)(?:-(?:\d\d\d\d|\d\ds?))?))[, ]*/gi;

export const yearToken = (year: InternalYear): YearToken => ({ kind: 'YEAR', value: year }) as const;
export const unknownToken = (): UnknownToken => ({ kind: 'UNKNOWN' }) as const;
export const rangePostfixToken = (): RangeToken => ({ kind: 'RANGE', value: 'SSUFFIX' }) as const;
export const rangeSpanToken = (): RangeToken => ({ kind: 'RANGE', value: 'SPAN' }) as const;

