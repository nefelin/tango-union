import {RawSong, JustSlop, TrackId} from "./types";
import * as r from "ramda";

const foldDiacritics = (s: string) =>
    s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const stripNonAlpha = r.replace(/[^A-zÀ-ú\d\s]/g, "");

// export const songWithoutSlop = (indexed: SloppedSong | RawSong): RawSong =>
//     r.omit(["slop"], indexed);

export const cleanSlop = r.pipe(r.toLower, foldDiacritics, stripNonAlpha);

export const fuzzyIndex = (songs: JustSlop[]) => {
    const songsByFuzzy = (rawTerm: string): TrackId[] => {
        const terms = cleanSlop(rawTerm).split(commaOrWhiteSpace);

        const hasAllTerms = r.allPass(r.map((term) => r.contains(term), terms));
        const found = songs.filter(({ slop }) => hasAllTerms(slop));

        return found.map(r.prop("_id"));
    };

    return {
        songsByFuzzy
    }
};

const commaOrWhiteSpace = /[,\s]+/;