import * as r from 'ramda';
import { SimpleTrack, stripYoutubeAndTimeStamp } from '../index.service';

interface SlopMeta {
  slop: string;
}

const NULL_LABELS = {
  SINGER: 'Instrumental',
  ORCHESTRA: 'Unknown',
};

const indexedCategories = ['singer', 'orchestra', 'genre'] as const;

type IndexedCategory = typeof indexedCategories[number];

type CategoryMember = string;

type MemberToTracks = Record<CategoryMember, SimpleTrack['_id'][]>;

type SelectIndex = Record<IndexedCategory, MemberToTracks>;

type SloppedSong = SimpleTrack & SlopMeta;

const foldDiacritics = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const stripNonAlpha = r.replace(/[^A-zÀ-ú\d\s]/g, '');

const cleanSlop = r.pipe(r.toLower, foldDiacritics, stripNonAlpha, r.trim);

export interface IndexedSongData {
  songs: SloppedSong[];
  selectIndex: SelectIndex;
}

// slop stuff
const flattenSingersAndOrchestras = ({
  orchestra,
  singer,
  ...rest
}: SimpleTrack) => ({
  ...rest,
  orchestra: orchestra && orchestra.join(' '),
  singer: singer && singer.join(' '),
});
const valuesForSlop = (song: SimpleTrack) =>
  r.pipe(
    flattenSingersAndOrchestras,
    r.omit(['secondsLong', '_id', 'year']),
    Object.values,
    r.reject(r.isEmpty),
    r.join(' '),
  )(song);
const slopFromSong = r.pipe(valuesForSlop, cleanSlop);
const songWithSlop = (song: SimpleTrack) => ({
  ...song,
  slop: slopFromSong(song),
});

// selectIndex stuff
const makeSelectIndex = (allSongs: SimpleTrack[]): SelectIndex => {
  const options: Record<IndexedCategory, MemberToTracks> = {
    orchestra: {},
    genre: {},
    singer: {},
  };

  const genreNames = {
    tango: 'tango',
    vals: 'vals',
    milonga: 'milonga',
    other: 'other',
  };

  const getIndexGenre = (genre?: string) => {
    if (!genre) {
      return genreNames.other;
    }

    if (r.contains(genreNames.tango)(genre)) return genreNames.tango;
    if (r.contains(genreNames.vals)(genre)) return genreNames.vals;
    if (r.contains(genreNames.milonga)(genre)) return genreNames.milonga;

    return genreNames.other;
  };

  for (const { _id, singer, orchestra, genre } of allSongs) {
    if (singer?.length) {
      for (const thisSinger of singer) {
        options.singer = {
          ...options.singer,
          [thisSinger]: [...(options.singer[thisSinger] || []), _id],
        };
      }
    } else {
      options.singer = {
        ...options.singer,
        [NULL_LABELS.SINGER]: [
          ...(options.singer[NULL_LABELS.SINGER] || []),
          _id,
        ],
      };
    }

    if (orchestra?.length) {
      for (const thisOrchestra of orchestra) {
        options.orchestra = {
          ...options.orchestra,
          [thisOrchestra]: [...(options.orchestra[thisOrchestra] || []), _id],
        };
      }
    } else {
      options.orchestra = {
        ...options.orchestra,
        [NULL_LABELS.ORCHESTRA]: [
          ...(options.orchestra[NULL_LABELS.ORCHESTRA] || []),
          _id,
        ],
      };
    }

    const indexGenre = getIndexGenre(genre);
    options.genre = {
      ...options.genre,
      [indexGenre]: [...(options.genre[indexGenre] || []), _id],
    };
  }

  return options;
};

export const indexSongs = (rawSongs: SimpleTrack[]): IndexedSongData => {
  const songs = r.map(r.pipe(stripYoutubeAndTimeStamp, songWithSlop), rawSongs);

  const selectIndex = makeSelectIndex(songs);

  return {
    songs,
    selectIndex,
  };
};
