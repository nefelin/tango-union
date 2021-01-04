import { queryStringFromSong, removeSearchIrrelevantTerms } from './util';
import { TangoTrack } from './types';

it('removeSearchIrrelevantTerms should remove any occurences of Unknown Male or Unknown Female', () => {
  const term = 'juan darienzo unknown female pensalo bien unknown male';

  const res = removeSearchIrrelevantTerms(term);

  expect(res).toEqual('juan darienzo pensalo bien');
});

describe('queryFromString should flatten object to an appropriate youtube search string', () => {
  const song: TangoTrack = {
    title: 'Besos de miel',
    genre: 'fox trot',
    orchestra: ['Francisco Canaro'],
    singer: ['Ada Falcón', 'Charlo'],
    date: 1931,
    duration: 196,
  };

  const res = queryStringFromSong(song);
  it('should contain all expected fields', () => {
    const expectToBePresent = [
      '1931',
      'besos de miel',
      'francisco canaro',
      'ada falcon',
      'charlo',
    ];

    for (const str of expectToBePresent) {
      expect(res.match(new RegExp(str, 'i'))).toBeTruthy();
    }
  });

  it('should remove diacritics', () => {
    expect(res.match(/falcon/i)).toBeTruthy();
  });

  it('should lowercasify all', () => {
    expect(res.match(/A-Z/)).toBeFalsy();
  });

  it('should omit duration and genre', () => {
    const expectToBeAbsent = ['196', 'fox trot'];

    for (const str of expectToBeAbsent) {
      expect(res.match(new RegExp(str, 'i'))).toBeFalsy();
    }
  });
});
