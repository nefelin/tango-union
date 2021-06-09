import { testTracks } from '../testData/mongoTestTracksSampleTwenty';
import { CompoundIndex } from '../index/compoundIndex';
import { Searcher } from './searcher';

const searcher = new Searcher(new CompoundIndex(testTracks));

it('should support text search', () => {
  // just ensuring search is supported, no any actual details
  const trackIds = searcher.byText('bac');
  expect(trackIds).toBeTruthy();
});

describe('byCategoryMembers', () => {
  it('should treat criteria in the same category as OR searches', () => {
    const expected = [3, 4, 17, 12];
    const res = searcher.byCategoriesMembers({
      orchestra: [
        'Guillermo Barbieri',
        'Selección Nacional',
        'Florindo Sassone',
      ],
    });
    expect(res).toEqual(expected);
  });

  it("should treat criteria in the different category as AND'ed with other categories searches", () => {
    const expected = [4, 17];
    const res = searcher.byCategoriesMembers({
      orchestra: [
        'Guillermo Barbieri',
        'Selección Nacional',
        'Florindo Sassone',
      ],
      year: ['2005']
    });
    expect(res).toEqual(expected);
  });
});

describe('byCompoundSearch', () => {
  const res = searcher.byCompoundSearch({
    text: 'bah'
  })

  // const res = searcher.byText('bah')

  console.log(res);
});