import { testTracks } from '../testData/mongoTestTracksSampleTwenty';
import { CompoundIndex } from '../compoundIndex/compoundIndex';
import { Searcher } from './searcher';

const searcher = new Searcher(new CompoundIndex(testTracks));

describe('Category search', () => {
  it('should treat criteria in the same category as OR searches', () => {
    const expected = [3, 4, 17, 12];
    const res = searcher.byCompoundSearch({
      categories: {
        orchestra: [
          'Guillermo Barbieri',
          'Selección Nacional',
          'Florindo Sassone',
        ],
      },
    });
    expect(res.ids).toEqual(expected);
  });

  it("should treat criteria in the different category as AND'ed with other categories searches", () => {
    const expected = [4, 17];
    const res = searcher.byCompoundSearch({
      categories: {
        orchestra: [
          'Guillermo Barbieri',
          'Selección Nacional',
          'Florindo Sassone',
        ],
        year: ['2005'],
      },
    });
    expect(res.ids).toEqual(expected);
  });
});


it("should treat year terms and other text and AND'ed terms", () => {
  const expected = [15, 18];
  const res = searcher.byCompoundSearch({
    text: '50s sarli',
  });

  expect(res.ids).toEqual(expected);
});

it("should treat non year terms as AND'ed terms", () => {
  const expected = [16];
  const res = searcher.byCompoundSearch({
    text: 'bahia fres',
  });

  expect(res.ids).toEqual(expected);
});

it('should sort results', () => {
  // fixme, should be working, write this test
  const res = searcher.byCompoundSearch({
    text: '01-99'
  }, 'year', 'DESC');

  console.log(res.ids.map(id => testTracks[id]));
});