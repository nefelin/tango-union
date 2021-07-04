"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compoundResultsFromFacetedResults = exports.andifyMongoTextSearch = void 0;
const andifyMongoTextSearch = (text) => {
    if (!text) {
        return text;
    }
    return text
        .split(' ')
        .map((word) => `"${word}"`)
        .join(' ');
};
exports.andifyMongoTextSearch = andifyMongoTextSearch;
const compoundResultsFromFacetedResults = (res) => {
    var _a, _b;
    const pairsFromCounts = ({ _id: name, count }) => ({
        name,
        count,
    });
    return {
        ids: res.tracks.map(({ id }) => id),
        counts: {
            singer: res.singerCount.map(pairsFromCounts),
            orchestra: res.orchestraCount.map(pairsFromCounts),
            genre: res.genreCount.map(pairsFromCounts),
        },
        totalResults: (_b = (_a = res.total[0]) === null || _a === void 0 ? void 0 : _a.total) !== null && _b !== void 0 ? _b : 0,
    };
};
exports.compoundResultsFromFacetedResults = compoundResultsFromFacetedResults;
//# sourceMappingURL=util.js.map