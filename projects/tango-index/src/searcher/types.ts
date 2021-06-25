import { CategoryMember, IndexedCategory, SelectIndexCount, TrackId } from '../types/types';

export const NULL_LABELS = {
  SINGER: 'Instrumental',
  ORCHESTRA: 'Unknown',
  YEAR: 'Unknown',
};

export type CategoryInput = Partial<Record<IndexedCategory, Array<CategoryMember>>>;
export interface CompoundInput {
  text?: string;
  categories?: CategoryInput;
}

export interface CompoundResults {
  ids: Array<TrackId>;
  counts: SelectIndexCount;
}

export type SortDirection = 'ASC' | 'DESC';