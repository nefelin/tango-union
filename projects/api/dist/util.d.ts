import { Track } from './schemas/tracks.entity';
export declare const removeSearchIrrelevantTerms: (query: string) => string;
export declare const queryStringFromSong: (song: Track) => string;
