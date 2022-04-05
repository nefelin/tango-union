import { SortOrder } from 'react-base-table';

import { Maybe } from '../../../types/utility/maybe';

export type SortState = Record<Partial<string>, Maybe<SortOrder>>;
