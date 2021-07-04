export declare type Maybe<T> = T | null;
export declare type Barely<T> = T | null | undefined;
export interface TangoTrack {
    genre: string;
    length: string;
    title: string;
    orchestra: string;
    singer: string;
    id: number;
    year: Maybe<number>;
}
export declare type TrackId = number;
