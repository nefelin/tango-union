"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slopFromSong = exports.cleanSlop = exports.stripNonAlpha = exports.foldDiacritics = exports.valuesForSlop = void 0;
const r = __importStar(require("ramda"));
const arrayToString = (ar) => Array.isArray(ar) ? ar.join(' ') : ar;
const valuesForSlop = (song) => r.pipe(r.pick(['title', 'orchestra', 'singer', 'genre']), Object.values, r.reject(r.isEmpty), r.map(arrayToString), r.join(' '))(song);
exports.valuesForSlop = valuesForSlop;
const foldDiacritics = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
exports.foldDiacritics = foldDiacritics;
exports.stripNonAlpha = r.replace(/[^A-zÀ-ú\d\s]/g, '');
exports.cleanSlop = r.pipe(r.toLower, exports.foldDiacritics, exports.stripNonAlpha);
exports.slopFromSong = r.pipe(exports.valuesForSlop, exports.cleanSlop);
//# sourceMappingURL=slop.js.map