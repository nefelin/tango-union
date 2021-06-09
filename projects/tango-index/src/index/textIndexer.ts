import { SimpleTrack, TrackId } from '../types/types';
import { cleanSlop, intersectionReducer } from './util';
import { TangoTrie } from '../types/tangoTrie';

export class TextIndexer {
  private root = new TangoTrie();

  constructor(tracks?: Array<SimpleTrack>) {
    if (tracks) {
      tracks.forEach((track) => this.indexTrack(track));
    }
  }

  loadTrie(trie: TangoTrie) {
    this.root = trie;
  }

  private insertTerm(term: string, location: number) {
    let node = this.root;
    const cleaned = cleanSlop(term);
    const words = cleaned.split(' ');

    words.forEach((word) => {
      node = this.root;
      for (let letter of word.split('')) {
        node = node.insert(letter, location);
      }
    });
  }

  indexTrack(track: SimpleTrack) {
    Object.values(track).forEach((value) => {
      if (Array.isArray(value)) {
        value.forEach((term) => this.insertTerm(term, track.trackId));
      } else if (typeof value === 'string') {
        this.insertTerm(value, track.trackId);
      }
    });
  }

  search(term: string): Set<TrackId> {
    const hits = term.split(' ').map((term) => this.root.lookup(term));
    return hits.reduce(intersectionReducer);
  }
}
