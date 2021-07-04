import { Maybe } from '../../types';
declare type InternalYear = number;
export declare type YearFilter<UnknownYearType = null, YearType = InternalYear> = Set<YearType | UnknownYearType>;
export declare type ParseResult<UnknownYearType> = Maybe<Array<number | UnknownYearType>>;
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
export declare type Token = RangeToken | YearToken | UnknownToken | InvalidToken;
export declare const validYearTerms: RegExp;
export declare const yearToken: (year: InternalYear) => YearToken;
export declare const unknownToken: () => UnknownToken;
export declare const rangePostfixToken: () => RangeToken;
export declare const rangeSpanToken: () => RangeToken;
export {};
