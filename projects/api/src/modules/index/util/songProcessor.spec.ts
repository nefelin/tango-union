import { indexSongs } from './songProcessor';
import * as r from 'ramda';
import { testTracks } from './mongoTestTracksSampleTwenty';

const index = indexSongs(testTracks);
describe('Song slop should contain simplified aggregation of object keys optimized for text search', () => {
  const allSlop = index.songs.map(r.prop('slop')).join(' ');

  it('should add slop to every song', () => {
    expect(r.all(r.has('slop'), index.songs));
  });

  it('should not contain secondsLong, year, or _id', () => {
    expect(allSlop.match(/\d\d\d\d/)).toBeFalsy();
    expect(allSlop.match(/\d\d\d/)).toBeFalsy();
    expect(allSlop.match(/\d\d\d/)).toBeFalsy();
  });

  it('should flatten diacritics', () => {
    expect(allSlop.match(/[áéíóú]/i)).toBeFalsy();
  });

  it('should lowercasify all', () => {
    expect(allSlop.match(/[A-Z]/)).toBeFalsy();
  });

  it('should remove any non alpha-numeric, including punctuation', () => {
    expect(allSlop.match(/[^a-z0-9\s]/)).toBeFalsy();
  });
});

it('should generate the select index for each relevant category', () => {
  const categories = ['orchestra', 'genre', 'singer'];

  for (const cat of categories) {
    expect(r.has(cat, index.selectIndex)).toBeTruthy();
  }
});

it('should index blank orchestras under the Unknown option', () => {
  const noOrchestraCount = testTracks
    .map(r.propOr(null, 'orchestra'))
    .filter(r.isNil).length;

  expect(index.selectIndex.orchestra['Unknown']).toHaveLength(noOrchestraCount);
});

it('should index blank singers under the Instrumental option', () => {
  const noSingerCount = testTracks.map(r.propOr(null, 'singer')).filter(r.isNil)
    .length;

  expect(index.selectIndex.singer['Instrumental']).toHaveLength(noSingerCount);
});

it('should place the correct number of songs for a given category', () => {
  const lengthExpectations = {
    orchestra: {
      Unknown: 3,
      'Roberto Firpo': 2,
      'Ángel Domingo Riverol': 1,
      'Guillermo Barbieri': 1,
      'José María Aguilar': 1,
      'Selección Nacional': 2,
      'Osvaldo Fresedo': 2,
      'Aníbal Troilo': 1,
      'Francisco Lomuto': 1,
      'Francisco Canaro': 1,
      'Adolfo Carabelli': 1,
      'Trio Neuklang': 1,
      'Florindo Sassone': 1,
      'Cayetano Puglisi': 1,
      'Horacio Salgán': 1,
      'Ubaldo Aquiles De Lio': 1,
      'Carlos Di Sarli': 2,
    },
    genre: { tango: 15, other: 5 },
    singer: { Instrumental: 18, 'Carlos Gardel': 1, 'Jaime Moreno': 1 },
  };

  for (const cat of Object.keys(lengthExpectations)) {
    for (const val of Object.keys(lengthExpectations[cat])) {
      expect(index.selectIndex[cat][val].length).toEqual(
        lengthExpectations[cat][val],
      );
    }
  }
});
