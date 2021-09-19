import { SimpleTrack } from './dto/simpletrack.entity';

export interface FacetedResults {
  yearCount?: EntityCount[] | null;
  singerCount?: EntityCount[] | null;
  orchestraCount?: EntityCount[] | null;
  genreCount?: EntityCount[] | null;
  tracks?: Pick<SimpleTrack, 'id'>[] | null;
  random?: Pick<SimpleTrack, 'id'>[] | null;
  total: Array<{ total: number }>;
}

export interface EntityCount {
  _id: string;
  count: number;
}
