import { TrackDocument } from '../schemas/tracks.entity';
export declare const nGramsFromString: (str: string, minLen?: number, delimiter?: string) => string;
export declare const addNgramsToTrack: (track: TrackDocument) => void;
