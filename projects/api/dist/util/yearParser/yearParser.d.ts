import { ParseResult, YearToken } from './types';
export declare class YearParser<T> {
    unknownYearValue: T;
    constructor(unknownYearValue: T);
    yearsFromSearch(term: string): ParseResult<T>;
    stripYearTerms(term: string): string;
    private extractYearTerms;
    tokenFromString(year: string): YearToken | undefined;
    private tokenize;
    private expandTokens;
    handleError(errMsg: string): void;
}
