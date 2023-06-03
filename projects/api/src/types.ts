export type Maybe<T> = T | null;
export type Barely<T> = T | null | undefined;

export interface TangoTrack {
  genre: string;
  length: string;
  title: string;
  orchestra: string;
  singer: string;
  id: number;
  year: Maybe<number>;
}

export type TrackId = string; // wtf is this a string?