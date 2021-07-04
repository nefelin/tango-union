"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNgramsToTrack = exports.nGramsFromString = void 0;
const slop_1 = require("./slop");
const nGramsFromString = (str, minLen = 2, delimiter = '') => {
    const nGrams = [];
    for (const term of str.split(delimiter)) {
        let nGram = '';
        for (const char of term) {
            nGram += char;
            if (nGram.length >= minLen) {
                nGrams.push(nGram);
            }
        }
    }
    return nGrams.join(' ');
};
exports.nGramsFromString = nGramsFromString;
const addNgramsToTrack = (track) => {
    const textSlop = slop_1.slopFromSong(track);
    track.searchGrams = exports.nGramsFromString(textSlop);
    track.save();
};
exports.addNgramsToTrack = addNgramsToTrack;
//# sourceMappingURL=ngramFromTrack.js.map