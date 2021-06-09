import { testTracks } from '../testData/mongoTestTracksSampleTwenty';
import { TextIndexer } from './textIndexer';

const index = new TextIndexer(testTracks)
it('should ignore case and diacritics', () => {
  const expectedIds = [5,7,10]
  const trackIds = index.search('bacan');
  expect(trackIds).toEqual(expectedIds);
});
