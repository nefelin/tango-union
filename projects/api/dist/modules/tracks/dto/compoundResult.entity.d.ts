import { TrackId } from '../../../types';
export declare class CompoundResults {
    ids: Array<TrackId>;
    totalResults: number;
    counts: SelectIndexCount;
}
export declare class CountTuple {
    name: string;
    count: number;
}
export declare class SelectIndexCount {
    singer: Array<CountTuple>;
    orchestra: Array<CountTuple>;
    genre: Array<CountTuple>;
}
