import { queryStringFromSong, removeSearchIrrelevantTerms } from './util';
import { TangoTrack } from './types';
import { Track } from './schemas/Track';

it('removeSearchIrrelevantTerms should remove any occurences of "Unknown Male" or "Unknown Female"', () => {
  const term = 'juan darienzo unknown female pensalo bien unknown male';

  const res = removeSearchIrrelevantTerms(term);

  expect(res).toEqual('juan darienzo pensalo bien');
});

describe('queryFromString should flatten object to an appropriate youtube search string', () => {
  const song: Track = {
    title: 'Besos de miel',
    genre: 'fox trot',
    orchestra: ['Francisco Canaro'],
    singer: ['Ada Falcón', 'Charlo'],
    year: 1931,
    secondsLong: 196,
    youtube: {
      scrapedAt: new Date(),
      links: [],
    },
  };

  const res = queryStringFromSong(song);

  console.log(res);
  it('should contain all expected fields', () => {
    const expectToBePresent = [
      '1931',
      'besos de miel',
      'francisco canaro',
      'ada falcón',
      'charlo',
    ];

    for (const str of expectToBePresent) {
      expect(res.match(new RegExp(str, 'i'))).toBeTruthy();
    }
  });

  it('should maintain diacritics', () => {
    expect(res.match(/Falcón/i)).toBeTruthy();
  });

  it('should omit duration and genre', () => {
    const expectToBeAbsent = ['196', 'fox trot'];

    for (const str of expectToBeAbsent) {
      expect(res.match(new RegExp(str, 'i'))).toBeFalsy();
    }
  });
});
