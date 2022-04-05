import { SortOrder } from 'react-base-table';

import { SortState } from '../types/sortState';

export const sanitizeSort = (sort: SortState) =>
  Object.fromEntries(
    Object.entries(sort).filter(([_, val]) => !!val),
  ) as Record<string, SortOrder>; // as casting ok as we eliminate maybe values
