import { TrackId } from './types';

export interface JSONTrieNodeData {
  children: Record<string, JSONTrieNodeData>;
  locations: Array<number>;
  complete: boolean;
};

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

  toJSON() {
    return {
      children: this.children,
      complete: this.complete,
      locations: Array.from(this.locations),
    };
  }

  fromObject({ children, complete, locations }: JSONTrieNodeData): TangoTrie {
    this.complete = complete;
    this.locations = locations.length ? new Set(locations) : new Set();
    for (let [key, child] of Object.entries(children)) {
      const newChild = new TangoTrie();
      this.children[key] = newChild.fromObject(child);
    }
    return this;
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
        break;
      }
    }

    return node?.locations || new Set();
  }
}
