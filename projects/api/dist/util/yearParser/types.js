"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rangeSpanToken = exports.rangePostfixToken = exports.unknownToken = exports.yearToken = exports.validYearTerms = void 0;
exports.validYearTerms = /(\?|(?:(?:\d\d\d\d|\d\ds?)(?:-(?:\d\d\d\d|\d\ds?))?))[, ]*/ig;
const yearToken = (year) => ({ kind: 'YEAR', value: year });
exports.yearToken = yearToken;
const unknownToken = () => ({ kind: 'UNKNOWN' });
exports.unknownToken = unknownToken;
const rangePostfixToken = () => ({ kind: 'RANGE', value: 'SSUFFIX' });
exports.rangePostfixToken = rangePostfixToken;
const rangeSpanToken = () => ({ kind: 'RANGE', value: 'SPAN' });
exports.rangeSpanToken = rangeSpanToken;
//# sourceMappingURL=types.js.map