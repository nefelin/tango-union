import { Barely, Maybe } from '../../types/utilTypes';
import {
  ParseResult,
  rangePostfixToken,
  rangeSpanToken,
  Token,
  unknownToken,
  validYearTerms,
  YearFilter,
  yearToken,
  YearToken,
} from './types';

export class YearParser<T> {
  unknownYearValue: T;
  constructor(unknownYearValue: T) {
    this.unknownYearValue = unknownYearValue;
  }

  yearsFromSearch(term: string): ParseResult<T>{
    const yearTerms = this.extractYearTerms(term);
    if (!yearTerms) {
      return null;
    }
    const tokens = this.tokenize(yearTerms);
    const expanded = this.expandTokens(tokens);
    const stringified: Array<string | T> | null = expanded ? Array.from(expanded).map((year) => typeof year === 'number' ? year.toString() : year) : null;
    return stringified;
  }

  stripYearTerms(term: string): string {
    return term.replace(validYearTerms, '');
  }

  private extractYearTerms(term: string): Barely<string> {
    return term.match(validYearTerms)?.join(' ');
  }

  tokenFromString(year: string): YearToken | undefined {
    switch (year.length) {
      case 2:
        return yearToken(parseInt(`19${year}`));
      case 4:
        return yearToken(parseInt(year));
      default:
        this.handleError(`'${year}': Years must be two or four digits`);
        return undefined;
    }
  }

  private tokenize(query: string): Array<Token> {
    const tokens: Array<Token> = [];
    let buffer = '';
    let pointer = 0;

    while (true) {
      const c = query[pointer];

      if (isNaN(parseInt(c))) {
        if (buffer.length > 0) {
          const newToken = this.tokenFromString(buffer);
          if (newToken) {
            tokens.push(newToken);
          }
          buffer = '';
        }

        if (c === undefined) {
          break;
        }

        switch (c) {
          case ' ':
          case ',':
            // delimeters
            break;
          case '-':
            tokens.push(rangeSpanToken());
            break;
          case 's':
            tokens.push(rangePostfixToken());
            break;
          case '?':
            tokens.push(unknownToken());
            break;
          default:
            throw new Error(`Unrecognized symbol: '${c}'`);
        }

        pointer++;
        continue;
      }

      buffer += c;
      pointer++;
    }

    return tokens;
  }

  private expandTokens(tokens: Array<Token>): Maybe<YearFilter<T>> {
    const years: YearFilter<T> = new Set();
    for (let pointer = 0; pointer < tokens.length; pointer++) {
      const token = tokens[pointer] as Token;
      switch (token.kind) {
        case 'YEAR':
          years.add(token.value);
          break;
        case 'UNKNOWN':
          years.add(this.unknownYearValue);
          break;

        case 'RANGE':
          const lastToken = tokens[pointer - 1];
          if (!lastToken || lastToken.kind !== 'YEAR') {
            this.handleError('Range symbol must be preceded by a year');
            return null;
          }

          const lastYear = lastToken.value;

          switch (token.value) {
            case 'SSUFFIX':
              [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((x) =>
                years.add(lastYear + x),
              );
              break;
            case 'SPAN':
              const nextToken = tokens[pointer + 1];
              if (!nextToken || nextToken.kind !== 'YEAR') {
                this.handleError(
                  'Range span symbol must be followed by a year',
                );
                return null;
              }

              const nextYear = nextToken.value;

              if (lastYear > nextYear) {
                this.handleError(
                  'Range span expects earlier year followed by later year',
                );
                return null;
              }

              for (
                let thisYear = lastYear + 1;
                thisYear < nextYear;
                thisYear++
              ) {
                years.add(thisYear);
              }
          }
          break;

        case 'INVALID':
          this.handleError(`Invalid symbol ${token.value}`);
          return null;
      }
    }
    return years;
  }

  handleError(errMsg: string) {
    console.error(errMsg);
  }
}
