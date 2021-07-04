"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YearParser = void 0;
const types_1 = require("./types");
class YearParser {
    constructor(unknownYearValue) {
        this.unknownYearValue = unknownYearValue;
    }
    yearsFromSearch(term) {
        const yearTerms = this.extractYearTerms(term);
        if (!yearTerms) {
            return null;
        }
        const tokens = this.tokenize(yearTerms);
        const expanded = this.expandTokens(tokens);
        return expanded ? Array.from(expanded) : null;
    }
    stripYearTerms(term) {
        return term.replace(types_1.validYearTerms, '');
    }
    extractYearTerms(term) {
        var _a;
        return (_a = term.match(types_1.validYearTerms)) === null || _a === void 0 ? void 0 : _a.join(' ');
    }
    tokenFromString(year) {
        switch (year.length) {
            case 2:
                return types_1.yearToken(parseInt(`19${year}`));
            case 4:
                return types_1.yearToken(parseInt(year));
            default:
                this.handleError(`'${year}': Years must be two or four digits`);
                return undefined;
        }
    }
    tokenize(query) {
        const tokens = [];
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
                        break;
                    case '-':
                        tokens.push(types_1.rangeSpanToken());
                        break;
                    case 's':
                        tokens.push(types_1.rangePostfixToken());
                        break;
                    case '?':
                        tokens.push(types_1.unknownToken());
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
    expandTokens(tokens) {
        const years = new Set();
        for (let pointer = 0; pointer < tokens.length; pointer++) {
            const token = tokens[pointer];
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
                            [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((x) => years.add(lastYear + x));
                            break;
                        case 'SPAN':
                            const nextToken = tokens[pointer + 1];
                            if (!nextToken || nextToken.kind !== 'YEAR') {
                                this.handleError('Range span symbol must be followed by a year');
                                return null;
                            }
                            const nextYear = nextToken.value;
                            if (lastYear > nextYear) {
                                this.handleError('Range span expects earlier year followed by later year');
                                return null;
                            }
                            for (let thisYear = lastYear + 1; thisYear < nextYear; thisYear++) {
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
    handleError(errMsg) {
        console.error(errMsg);
    }
}
exports.YearParser = YearParser;
//# sourceMappingURL=yearParser.js.map