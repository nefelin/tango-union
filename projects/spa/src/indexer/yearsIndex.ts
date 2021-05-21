import * as r from "ramda";
import {TrackId, JustYear} from "./types";
import {Maybe} from "../shared/types";

type Year = number;

type YearFilter = Set<Year | null>;

interface YearToken {
  kind: "YEAR";
  value: Year;
}

interface RangeToken {
  kind: "RANGE";
  value: "POST" | "SPAN";
}

interface InvalidToken {
  kind: "INVALID";
  value: string;
}

interface UnknownToken {
  kind: "UNKNOWN";
}

export const validYearTerms = /(?:\?|(?:(?:\d\d\d\d|\d\ds?)(?:-(?:\d\d\d\d|\d\ds?))?))/ig;

type Token = RangeToken | YearToken | UnknownToken | InvalidToken;

const unknownToken = (): UnknownToken => ({ kind: "UNKNOWN" });
const rangePostfixToken = (): RangeToken => ({ kind: "RANGE", value: "POST" });
const rangeSpanToken = (): RangeToken => ({ kind: "RANGE", value: "SPAN" });

const yearToken = (year: string): YearToken | undefined => {
  switch (year.length) {
    case 2:
      return {
        kind: "YEAR",
        value: parseInt("19" + year),
      };
    case 4:
      return {
        kind: "YEAR",
        value: parseInt(year),
      };
    default:
      handleError(`'${year}': Years must be two or four digits`);
      return undefined;
  }
};

const tokenize = (query: string): Token[] => {
  const tokens: Token[] = [];
  let buffer = "";
  let pointer = 0;

  while (true) {
    const c = query[pointer] || '';

    if (isNaN(parseInt(c))) {
      if (buffer.length > 0) {
        const newToken = yearToken(buffer);
        if (newToken) {
          tokens.push(newToken);
        }
        buffer = "";
      }

      if (c === undefined) {
        break;
      }

      switch (c) {
        case " ":
        case ",":
          //delimeters
          break;
        case "-":
          tokens.push(rangeSpanToken());
          break;
        case "s":
          tokens.push(rangePostfixToken());
          break;
        case "?":
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
};

const expandTokens = (tokens: Token[]): Maybe<YearFilter> => {
  const years: YearFilter = new Set();
  for (let pointer = 0; pointer < tokens.length; pointer++) {
    const token = tokens[pointer] as Token;
    switch (token.kind) {
      case "YEAR":
        years.add(token.value);
        break;
      case "UNKNOWN":
        years.add(null);
        break;

      case "RANGE":
        const lastToken = tokens[pointer - 1];
        if (!lastToken || lastToken.kind !== "YEAR") {
          handleError("Range symbol must be preceded by a year");
          return null;
        }

        const lastYear = lastToken.value;

        switch (token.value) {
          case "POST":
            [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((x) => years.add(lastYear + x));
            break;
          case "SPAN":
            const nextToken = tokens[pointer + 1];
            if (!nextToken || nextToken.kind !== "YEAR") {
              handleError("Range span symbol must be followed by a year");
              return null;
            }

            const nextYear = nextToken.value;

            if (lastYear > nextYear) {
              handleError(
                "Range span expects earlier year followed by later year"
              );
              return null;
            }

            for (let thisYear = lastYear + 1; thisYear < nextYear; thisYear++) {
              years.add(thisYear);
            }
        }
        break;

      case "INVALID":
        handleError(`Invalid symbol ${token.value}`);
        return null;
    }
  }
  return years;
};

const handleError = (errMsg: string) => {
  console.error(errMsg);
};

const yearsParser = r.pipe(tokenize, expandTokens);

export const yearsIndex = (rawSongs: JustYear[]) => {
  const songsByYears = (query: string): TrackId[] => {
    const searchYears = yearsParser(query);
    const found = searchYears
      ? rawSongs.filter(({ year }) => searchYears.has(year))
      : rawSongs;

    return found.map(r.prop("_id"));
  };

  return {
    songsByYears,
  };
};
