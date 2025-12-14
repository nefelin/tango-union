import { TrackId } from '../types';

export interface EntityCount {
  _id: string;
  count: number;
}

export interface FacetedResults {
  yearCount?: EntityCount[] | null;
  singerCount?: EntityCount[] | null;
  orchestraCount?: EntityCount[] | null;
  genreCount?: EntityCount[] | null;
  tracks?: { id: number }[] | null;
  random?: { id: number }[] | null;
  total: Array<{ total: number }>;
}

export interface CountTuple {
  name: string;
  count: number;
}

export interface SelectIndexCount {
  year: CountTuple[];
  singer: CountTuple[];
  orchestra: CountTuple[];
  genre: CountTuple[];
}

export interface CompoundResults {
  ids: TrackId[];
  randomId: TrackId;
  totalResults: number;
  totalPages: number;
  page: number;
  counts: SelectIndexCount;
}

export interface CompoundSortInput {
  singer?: number;
  orchestra?: number;
  genre?: number;
  year?: number;
  title?: number;
  secondsLong?: number;
  linkScore?: number;
}

export interface PaginationInput {
  limit: number;
  offset: number;
}

export interface CompoundQueryInput {
  sort?: CompoundSortInput;
  pagination?: PaginationInput;
  text?: string;
  year?: string;
  orchestras?: string[];
  singers?: string[];
  titles?: string[];
  genres?: string[];
  limitIds?: number[];
}

