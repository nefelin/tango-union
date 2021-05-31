import { TextIndexer} from './textIndexer';
import { testTracks } from '../testData/mongoTestTracksSampleTwenty';
import { TangoIndex } from './index';

it('should ', () => {
  const tangoIndex = new TangoIndex(testTracks);
  // console.log(tangoIndex)

  const ids = tangoIndex.textIndexer.search('ki');
  const reverse = tangoIndex.selectIndexer.countsFromTracks(ids);

  console.log(JSON.stringify(reverse, null, 1));
  
});