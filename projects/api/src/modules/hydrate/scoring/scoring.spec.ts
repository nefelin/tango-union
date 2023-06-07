import { scoreTrack } from './scoring';
import { Track } from '../../../schemas/tracks.entity';
import { flagWeights } from './types';

it('should score tracks with no matching terms as 0', () => {
  expect(scoreTrack(noMatch, 0)).toEqual(0);
});

it('should score tracks with only TITLE match correctly', () => {
  expect(scoreTrack(titleMatch, 0)).toEqual(flagWeights.title);
});

it('should score tracks with only TITLE with OR "|" match correctly', () => {
  expect(scoreTrack(titleMatchWithOr, 0)).toEqual(flagWeights.title);
});

it('should score tracks with only year match correctly', () => {
  expect(scoreTrack(yearMatch, 0)).toEqual(flagWeights.year);
});

it('should score tracks with only singer match correctly', () => {
  expect(scoreTrack(singerMatch, 0)).toEqual(flagWeights.singer);
});

const noMatch: Track = {
  title: 'Bailango',
  genre: 'milonga candombe',
  orchestra: ['Mario Canaro'],
  singer: ['Carlos Acuña'],
  secondsLong: 116,
  year: 1968,
  updatedAt: new Date(),
  youtube: {
    linkScore: 0,
    scrapedAt: new Date(),
    links: [
      {
        unionRating: 0,
        videoId: '1gvBX7E5Jpg',
        title: 'Francisco Canaro y su Orquesta Típica - Candombe  /1941-1949 /  (2000)',
        description:
          'Francisco Canaro CANDOMBE 1941-1949 El Bandoneón 2000 TEMAS: 01) En Esta Tarde Gris - (Jose Maria Contursi / Mariano ...',
        secondsLong: 3405,
        whenPosted: '1 year ago',
        views: 447,
        authorName: 'Felipe Pinto: Folklore y Tango Argentino',
        authorUrl: 'https://youtube.com/channel/UC93LHIU-aDVdUxc9_2dZq2g',
      },
    ],
  },
  searchGrams:
    'ba bai bail baila bailan bailang bailango ma mar mari mario ca can cana canar canaro ca car carl carlo carlos ac acu acun acuna mi mil milo milon milong milonga ca can cand cando candom candomb candombe',
  id: 34,
};

const titleMatch: Track = {
  title: 'Bailango',
  genre: 'milonga candombe',
  orchestra: ['Mario Canaro'],
  singer: ['Carlos Acuña'],
  secondsLong: 116,
  year: 1968,
  updatedAt: new Date(),
  youtube: {
    linkScore: 4,
    scrapedAt: new Date(),
    links: [
      {
        unionRating: 0,
        videoId: '1gvBX7E5Jpg',
        title: 'Francisco Canaro y su Orquesta Típica - Candombe  /1941-1949 /  (2000)',
        description: 'Bailango',
        secondsLong: 3405,
        whenPosted: '1 year ago',
        views: 447,
        authorName: 'Felipe Pinto: Folklore y Tango Argentino',
        authorUrl: 'https://youtube.com/channel/UC93LHIU-aDVdUxc9_2dZq2g',
      },
    ],
  },
  searchGrams:
    'ba bai bail baila bailan bailang bailango ma mar mari mario ca can cana canar canaro ca car carl carlo carlos ac acu acun acuna mi mil milo milon milong milonga ca can cand cando candom candomb candombe',
  id: 34,
};

const titleMatchWithOr: Track = {
  title: 'blah | Some other title',
  genre: 'milonga candombe',
  orchestra: ['Mario Canaro'],
  singer: ['Carlos Acuña'],
  secondsLong: 116,
  year: 1968,
  updatedAt: new Date(),
  youtube: {
    linkScore: 4,
    scrapedAt: new Date(),
    links: [
      {
        unionRating: 0,
        videoId: '1gvBX7E5Jpg',
        title: 'Francisco Canaro y su Orquesta Típica - Candombe  /1941-1949 /  (2000)',
        description: 'some other title',
        secondsLong: 3405,
        whenPosted: '1 year ago',
        views: 447,
        authorName: 'Felipe Pinto: Folklore y Tango Argentino',
        authorUrl: 'https://youtube.com/channel/UC93LHIU-aDVdUxc9_2dZq2g',
      },
    ],
  },
  searchGrams:
    'ba bai bail baila bailan bailang bailango ma mar mari mario ca can cana canar canaro ca car carl carlo carlos ac acu acun acuna mi mil milo milon milong milonga ca can cand cando candom candomb candombe',
  id: 34,
};

const yearMatch: Track = {
  title: 'no match',
  genre: 'milonga candombe',
  orchestra: ['Mario Canaro'],
  singer: ['Carlos Acuña'],
  secondsLong: 116,
  year: 1968,
  updatedAt: new Date(),
  youtube: {
    linkScore: 4,
    scrapedAt: new Date(),
    links: [
      {
        unionRating: 0,
        videoId: '1gvBX7E5Jpg',
        title: '1968',
        description: 'some other title',
        secondsLong: 3405,
        whenPosted: '1 year ago',
        views: 447,
        authorName: 'Felipe Pinto: Folklore y Tango Argentino',
        authorUrl: 'https://youtube.com/channel/UC93LHIU-aDVdUxc9_2dZq2g',
      },
    ],
  },
  searchGrams:
    'ba bai bail baila bailan bailang bailango ma mar mari mario ca can cana canar canaro ca car carl carlo carlos ac acu acun acuna mi mil milo milon milong milonga ca can cand cando candom candomb candombe',
  id: 34,
};

const singerMatch: Track = {
  title: 'noMatch',
  genre: 'milonga candombe',
  orchestra: ['Mario Canaro'],
  singer: ['Carlos Acuña'],
  secondsLong: 116,
  year: 1968,
  updatedAt: new Date(),
  youtube: {
    linkScore: 4,
    scrapedAt: new Date(),
    links: [
      {
        unionRating: 0,
        videoId: '1gvBX7E5Jpg',
        title: 'Carlos Acuna',
        description: 'some other title',
        secondsLong: 3405,
        whenPosted: '1 year ago',
        views: 447,
        authorName: 'Felipe Pinto: Folklore y Tango Argentino',
        authorUrl: 'https://youtube.com/channel/UC93LHIU-aDVdUxc9_2dZq2g',
      },
    ],
  },
  searchGrams:
    'ba bai bail baila bailan bailang bailango ma mar mari mario ca can cana canar canaro ca car carl carlo carlos ac acu acun acuna mi mil milo milon milong milonga ca can cand cando candom candomb candombe',
  id: 34,
};
