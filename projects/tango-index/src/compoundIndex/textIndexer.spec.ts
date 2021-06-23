import { testTracks } from '../testData/mongoTestTracksSampleTwenty';
import { TextIndexer } from './textIndexer';

const index = new TextIndexer(testTracks)

it('should stringify and import stringified indices correctly', () => {
  const expected = new Set([3, 15, 18])
  const s = JSON.stringify(index);
  const n = new TextIndexer();
  n.fromJSON(s);

  const res = n.search('carlos');
  expect(res).toEqual(expected)
});

it('should ignore case and diacritics', () => {
  const expectedIds = [5,7,10]
  const ids = index.search('bacan');
  expect(ids).toEqual(expectedIds);
});
