import * as r from 'ramda';
import { testTracks } from '../testData/mongoTestTracksSampleTwenty';
import {
  DropdownCategory,
  IndexedCategory,
  SelectIndexCount,
} from '../types/types';
import { SelectIndexer } from './selectIndexer';

const index = new SelectIndexer(testTracks);
it('should stringify and import stringified indices correctly', () => {
  const s = JSON.stringify(index);
  const n = new SelectIndexer();
  n.loadIndexes(s);

  const res = n.tracksByCategoryMembers('orchestra', ['Carlos Di Sarli']);
  expect(res).toEqual([15, 18]);
});

it('should index blank orchestras under the Unknown option', () => {
  const noOrchestraCount = testTracks
    .map(r.propOr(null, 'orchestra'))
    .filter(r.isNil).length;

  expect(index.tracksByCategoryMembers('orchestra', ['Unknown'])).toHaveLength(
    noOrchestraCount,
  );
});

it('should index blank singers under the Instrumental option', () => {
  const noSingerCount = testTracks
    .map(r.propOr(null, 'singer'))
    .filter(r.isNil).length;

  expect(
    index.tracksByCategoryMembers('singer', ['Instrumental']),
  ).toHaveLength(noSingerCount);
});

it('should place the correct number of songs for a given category', () => {
  const lengthExpectations: SelectIndexCount = {
    orchestra: {
      Unknown: 3,
      'Roberto Firpo': 1,
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
    genre: { tango: 15, other: 4 },
    singer: { Instrumental: 17, 'Carlos Gardel': 1, 'Jaime Moreno': 1 },
  };

  for (const cat of Object.keys(
    lengthExpectations,
  ) as Array<DropdownCategory>) {
    for (const val of Object.keys(lengthExpectations[cat])) {
      expect(index.tracksByCategoryMembers(cat, [val]).length).toEqual(
        lengthExpectations[cat][val],
      );
    }
  }
});
