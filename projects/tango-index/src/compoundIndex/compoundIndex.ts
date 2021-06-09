import { SelectIndexer } from './selectIndexer';
import { TextIndexer } from './textIndexer';
import { SimpleTrack } from '../types/types';

export class CompoundIndex {
  selectIndexer: SelectIndexer = new SelectIndexer();
  textIndexer: TextIndexer = new TextIndexer();

  constructor(tracks?: Array<SimpleTrack>){
    if (tracks) {
      this.loadTracks(tracks)
    }
  }

  loadTracks(tracks: Array<SimpleTrack>) {
   this.resetIndexes();
    tracks.forEach(track => this.addTrack(track))
  }

  addTrack(track: SimpleTrack) {
    this.selectIndexer.indexTrack(track);
    this.textIndexer.indexTrack(track);
  }

  private resetIndexes() {
    this.selectIndexer = new SelectIndexer();
    this.textIndexer = new TextIndexer();
  }
}