const r = require('ramda');

type Maybe<T> = T | null;

interface RawSong {
  genre: string;
  length: string;
  title: string;
  orchestra: string;
  singer: string;
  id: number;
  year: Maybe<number>;
}

interface SlopMeta {
  slop: string;
}

const indexedCategories = ['singer', 'orchestra', 'genre'] as const;

type IndexedCategory = typeof indexedCategories[number];

type CategoryMember = string;

type MemberToTracks = Record<CategoryMember, Array<RawSong['id']>>;

type SelectIndex = Record<IndexedCategory, MemberToTracks>;

type SloppedSong = RawSong & SlopMeta;

const foldDiacritics = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const stripNonAlpha = r.replace(/[^A-zÀ-ú\d\s]/g, '');

const cleanSlop = r.pipe(r.toLower, foldDiacritics, stripNonAlpha);

interface IndexedSongData {
  songs: Array<SloppedSong>;
  selectIndex: SelectIndex;
}

// slop stuff
const valuesForSlop = (song: RawSong) =>
  r.pipe(
    r.omit(['length', 'id', 'year', 'youtube']),
    Object.values,
    r.reject(r.isEmpty),
    r.join(' ')
  )(song);
const slopFromSong = r.pipe(valuesForSlop, cleanSlop);
const songWithSlop = (song: RawSong) => ({ ...song, slop: slopFromSong(song) });

// selectIndex stuff
const makeSelectIndex = (allSongs: Array<RawSong>): SelectIndex => {
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

  const getIndexGenre = (genre: string) => {
    if (r.contains(genreNames.tango)(genre)) return genreNames.tango;
    if (r.contains(genreNames.vals)(genre)) return genreNames.vals;
    if (r.contains(genreNames.milonga)(genre)) return genreNames.milonga;

    return genreNames.other;
  };

  for (const { id, singer, orchestra, genre } of allSongs) {
    if (singer !== '') {
      options.singer = {
        ...options.singer,
        [singer]: [...(options.singer[singer] || []), id],
      };
    }
    if (orchestra !== '') {
      options.orchestra = {
        ...options.orchestra,
        [orchestra]: [...(options.orchestra[orchestra] || []), id],
      };
    }

    const indexGenre = getIndexGenre(genre);
    options.genre = {
      ...options.genre,
      [indexGenre]: [...(options.genre[indexGenre] || []), id],
    };
  }

  return options;
};

const indexSongs = (rawSongs: Array<RawSong>): IndexedSongData => {
  const songs = rawSongs.map(songWithSlop);
  const selectIndex = makeSelectIndex(rawSongs);

  return {
    songs,
    selectIndex,
  };
};

module.exports = indexSongs;

export {}