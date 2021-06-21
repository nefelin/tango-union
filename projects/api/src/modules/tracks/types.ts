import { SimpleTrack } from './dto/simpletrack.entity';

export interface FacetedResults {
  singerCount?: EntityCount[] | null;
  orchestraCount?: EntityCount[] | null;
  genreCount?: EntityCount[] | null;
  tracks?: SimpleTrack[] | null;
}

export interface EntityCount {
  _id: string;
  count: number;
}
