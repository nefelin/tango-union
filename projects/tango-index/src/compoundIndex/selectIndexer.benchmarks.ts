import { SelectIndexer } from './selectIndexer';

const Benchmark = require('benchmark');
import { bigTracks } from '../testData/bigtracks';
import { testTracks } from '../testData/mongoTestTracksSampleTwenty';

const suite = new Benchmark.Suite();

const real20 = testTracks.slice(0, 9);
const fake20 = bigTracks.slice(0, 9);

const fakeIndex = new SelectIndexer(bigTracks);
const fakeIds = testTracks.map(({ id }) => id);

let selectIndexer = new SelectIndexer();
suite
  // .add('index real tracks', () => {
  //   real20.forEach(track => selectIndexer.indexTrack(track))
  // })
  // .add('index fake tracks', () => {
  //   fake20.forEach(track => selectIndexer.indexTrack(track))
  // })
  .on('cycle', (e: any) => {
    console.log(String(e.target));
  })
  .on('complete', function () {
    // @ts-ignore
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true, minSamples: 2000 });
