import { SelectIndexer } from './selectIndexer';
import { TextIndexer } from './textIndexer';
import { SimpleTrack } from '../types/types';

export class TangoIndex {
  selectIndexer: SelectIndexer = new SelectIndexer();
  textIndexer: TextIndexer = new TextIndexer();

  constructor(tracks?: Array<SimpleTrack>){
    if (tracks) {
      tracks.forEach(track => this.addTrack(track))
    }
  }

  addTrack(track: SimpleTrack) {
    this.selectIndexer.indexTrack(track);
    this.textIndexer.indexTrack(track);
  }


}