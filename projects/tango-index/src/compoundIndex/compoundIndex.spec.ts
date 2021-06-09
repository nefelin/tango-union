import { testTracks } from '../testData/mongoTestTracksSampleTwenty';
import { CompoundIndex } from './compoundIndex';
import { Searcher } from '../searcher/searcher';

const index = new CompoundIndex(testTracks);

it('should stringify and import stringified indices correctly', () => {
  const s = JSON.stringify(index);
  console.log(s)
  const n = new CompoundIndex();
  n.fromJSON(s);

  const search = new Searcher(n);

  const res = search.byCompoundSearch({
    categories: { orchestra: ['Carlos Di Sarli'] },
  });

  expect(res.trackIds).toEqual([15, 18]);
});
