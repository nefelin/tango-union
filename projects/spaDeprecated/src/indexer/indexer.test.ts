import * as r from 'ramda';
import { songSearcher } from './indexer';
import type { IndexedSongData, RawSong } from './types';
import type { IndexedCategory } from './categoryIndex';

const data = require('./indexedSampleTwenty.json') as IndexedSongData;

const index = songSearcher(data);

describe('Search index provides an interface', () => {
  describe('Year search parses complex terms like "42-53, 1945, 60s" correctly', () => {
    // throw new Error("needs tests to handle invalid input  behavior");

    it('should parse ? as meaning include unknown years', () => {
      const unknownYears = index.songsByYears('?');
      expect(unknownYears).toHaveLength(
        data.songs.filter(({ year }: RawSong) => year === null).length
      );
    });

    it('should parse individual years in two and four digit formats', () => {
      const twoDigit = index.songsByYears('26');
      const fourDigit = index.songsByYears('1926');

      expect(twoDigit[0]).toEqual(12);
      expect(fourDigit[0]).toEqual(12);
    });
    it('should parse two digit years + s (ie 50s) to mean that whole decade', () => {
      const thirties = index.songsByYears('30s');
      expect(thirties).toHaveLength(6);
    });
    it('should parse ranges denoted as year-year to mean start year, end year, and all years in between', () => {
      const smallRange = index.songsByYears('35-1937');
      expect(smallRange).toHaveLength(5);
    });
  });

  describe('Multiselect options', () => {
    it('should provide an options list for each of the indexed categories (i.e. Orch, Singer, Genre) in the format of [key]: songIds', () => {
      const indexedCategories: Record<IndexedCategory, null> =
        // this is a little weird but means insures we test all categories
        {
          singer: null,
          orchestra: null,
          genre: null,
        };
      const categories = Object.keys(indexedCategories) as Array<IndexedCategory>;

      for (const cat of categories) {
        expect(index.selectOptions[cat]).toBeTruthy();
      }
    });

    it('should have have one key per singer for singers options ("" should not be indexed), and same for orchestra.', () => {
      expect(Object.keys(index.selectOptions.singer).length).toEqual(10);
      expect(Object.keys(index.selectOptions.orchestra).length).toEqual(10);
    });

    test('each option should be a key with the value being how many songs that key references', () => {
      expect(index.selectOptions.orchestra["Juan D'Arienzo"]).toEqual(3);
      expect(index.selectOptions.genre['vals']).toEqual(5);
      expect(index.selectOptions.singer['Mercedes Simone']).toEqual(2);
    });

    it('should index songs with no listed singer to a category so they can be added to compound searches', () => {
      throw new Error('not implemented');
    });

    it('should index songs with blank orchestra fields to a category so that they can be added to compound searches', () => {
      throw new Error('');
    });

    describe('Genre, because of highly denormalized data, will index by tango, vals, milonga, and other', () => {
      it('should have 4 keys', () => {
        expect(Object.keys(index.selectOptions.genre).length).toEqual(4);
      });
    });

    it('should support search for single terms', () => {
      const foundByOrch = index.songsByOrchestras(["Juan D'Arienzo"]);
      const foundBySinger = index.songsBySingers(['Amelita Baltar']);
      const foundByGenre = index.songsByGenres(['vals']);
      expect(foundBySinger).toHaveLength(1);
      expect(foundByOrch).toHaveLength(3);
      expect(foundByGenre).toHaveLength(5);
    });

    it('should should support multiple terms', () => {
      const foundByOrch = index.songsByOrchestras([
        "Juan D'Arienzo",
        'Francisco Canaro',
      ]);
      const foundBySinger = index.songsBySingers([
        'Amelita Baltar',
        'Mercedes Simone',
      ]);
      const foundByGenre = index.songsByGenres(['vals', 'tango']);
      expect(foundBySinger).toHaveLength(3);
      expect(foundByOrch).toHaveLength(4);
      expect(foundByGenre).toHaveLength(10);
    });
  });

  describe('Sloppy Search', () => {
    it('should not support search by song length', () => {
      const lengthThatExists = '3:49';
      const res = index.songsByFuzzy(lengthThatExists);
      expect(res).toHaveLength(0);
    });

    it('should ignore diacritics', () => {
      const termWithDiacritic = 'Mariù';
      const res = index.songsByFuzzy(termWithDiacritic);
      expect(res[0]).toEqual(10);
    });

    it('should ignore case', () => {
      const searchString = 'darienzo';
      const res = index.songsByFuzzy(searchString);
      expect(res).toHaveLength(3);
    });

    it('should support multiple terms', () => {
      const searchString = "D'Arienzo habla";
      const res = index.songsByFuzzy(searchString);
      expect(res[0]).toEqual(7);
    });

    it('should require all terms be present on the same track', () => {
      const searchString = "D'Arienzo habla";
      const res = index.songsByFuzzy(searchString);
      expect(res).toHaveLength(1);
    });

    it('should ignore any non alpha, or digit characters, including punctuation', () => {
      const searchString = "D'Ari!!e?n...zo!!";
      const res = index.songsByFuzzy(searchString);
      expect(res).toHaveLength(3);
    });
  });

  describe('Compound search', () => {
    it('should be able to sort results before paginating', () => {
      throw new Error('not implemented');
    });
    it('should paginate results', () => {
      const limit = 2;
      const offset = 1;

      const allVals = [2, 3, 8, 10, 11];
      const res = index.compoundSearch({
        limit,
        offset,
        optionsQuery: { genre: ['vals'] },
      });

      // expect(res.length).toEqual(limit);
      expect(res.songs.map(r.prop('_id'))).toEqual(
        allVals.slice(offset, offset + limit)
      );
    });
    it('should have all optional parameters and return nothing when given no criteria', () => {
      const res = index.compoundSearch({});
      expect(res.songs).toEqual([]);
    });

    test("compound category search should return OR results for same category inputs (i.e. D'arienzo + Troilo) and AND results for cross category (i.e. Juan D'arienzo + vals", () => {
      const sameCatRes = index.compoundSearch({
        optionsQuery: { orchestra: ["Juan D'Arienzo", 'Francisco Canaro'] },
      });
      const crossCatRes = index.compoundSearch({
        optionsQuery: {
          orchestra: ["Juan D'Arienzo", 'Francisco Canaro'],
          genre: ['milonga'],
        },
      });

      expect(sameCatRes.songs).toHaveLength(4);
      expect(crossCatRes.songs).toHaveLength(1);
    });

    test("results from options, year, and text search should be OR'ed together to produce results", () => {
      const res = index.compoundSearch({
        optionsQuery: {
          orchestra: ["Juan D'Arienzo", 'Francisco Canaro', 'Astor Piazzolla'],
        },
        searchQuery: 'habla',
      });
      expect(res.songs).toHaveLength(1);
    });

    it('should encapsulate year search', () => {
      const shouldFindTrackIds = [0, 1, 4, 5, 6, 8, 9, 10, 11, 13, 14, 15];
      const res = index.compoundSearch({
        searchQuery: '30s ?',
      });

      const ids = res.songs.map(r.prop('_id'));
      expect(ids).toEqual(shouldFindTrackIds);
    });
    test('fuzzy search should combine sloppy search and years search into a single algorith', () => {
      const shouldFindTrackIds = [8, 11];
      const res = index.compoundSearch({
        searchQuery: 'habla 30s 22-24',
      });
      const ids = res.songs.map(r.prop('_id'));

      expect(ids).toEqual(shouldFindTrackIds);
    });

    it('should return an updatedSelectOptions object that shows select options with counts intersecting current search', () => {
      const res = index.compoundSearch({
        searchQuery: '30s',
      });

      expect(res.filteredSelectOptions).toEqual({
        orchestra: {
          'Osvaldo Fresedo': 2,
          '-unspecified guitars-': 0,
          'Ángel F. Condercuri': 0,
          'Eduardo Rovira': 0,
          'Daniel Melingo': 0,
          "Juan D'Arienzo": 2,
          'Francisco Lomuto': 1,
          'Jorge Dragone': 0,
          'Francisco Canaro': 0,
          'Astor Piazzolla': 0,
        },
        genre: { other: 3, vals: 2, tango: 0, milonga: 1 },
        singer: {
          'Roberto Ray': 2,
          'Alberto Vila': 0,
          'Alberto Castillo': 0,
          'Daniel Melingo': 0,
          'Armando Laborde': 0,
          Charlo: 1,
          'Argentino Ledesma': 0,
          'Mercedes Simone': 1,
          'Azucena Maizani': 0,
          'Amelita Baltar': 0,
        },
      });
    });
  });
});
