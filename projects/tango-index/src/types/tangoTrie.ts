import { TrackId } from './types';

export class TangoTrie {
  children: Record<string, TangoTrie> = {};
  complete: boolean = false;
  locations: Set<TrackId> = new Set();
  constructor(location?: TrackId, complete: boolean = false) {
    this.complete = complete;
    if (location) {
      this.locations = new Set([location]);
    }
  }

  addLocation(location: TrackId) {
    this.locations.add(location);
  }

  setComplete(newComplete: boolean) {
    this.complete = newComplete;
  }

  getChild(char: string) {
    return this.children[char] || null;
  }

  insert(char: string, location: TrackId, complete?: boolean) {
    if (!this.children[char]) {
      this.children[char] = new TangoTrie(location, complete);
    }
    this.children[char].addLocation(location);
    return this.children[char];
  }

  lookup(term: string): Set<TrackId> {
    let node: TangoTrie | null = this;
    const chars = term.split('');

    for (let char of chars) {
      node = node.children[char];
      if (node === undefined) {
        break
      }
    }

    return node?.locations || new Set();
  }
}
