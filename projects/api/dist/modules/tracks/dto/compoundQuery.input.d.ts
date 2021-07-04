export declare class CompoundQueryInput {
    sort?: CompoundSortInput;
    pagination?: PaginationInput;
    text?: string;
    orchestras?: string[];
    singers?: string[];
    titles?: string[];
    genres?: string[];
}
export declare class PaginationInput {
    limit: number;
    offset: number;
}
export declare class CompoundSortInput {
    singer?: number;
    orchestra?: number;
    genre?: number;
    year?: number;
    title?: number;
    secondsLong?: number;
}
