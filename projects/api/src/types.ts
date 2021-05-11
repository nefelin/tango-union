export type Maybe<T> = T | null;

export interface TangoTrack {
  genre: string;
  length: string;
  title: string;
  orchestra: string;
  singer: string;
  trackId: number;
  year: Maybe<number>;
}