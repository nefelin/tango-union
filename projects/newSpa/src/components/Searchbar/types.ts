import type { Option } from 'react-select/src/filters';

import type { Maybe } from '../../types';

export interface SearchbarState {
  orchestra: Maybe<Array<Option>>;
  singer: Maybe<Array<Option>>;
  genre: Maybe<Array<Option>>;
  search: string;
  sort: Record<string, 'asc' | 'desc'>;
}

export const initSearchbarState: SearchbarState = {
  search: '',
  orchestra: [],
  singer: [],
  genre: [],
  sort: { title: 'asc' },
};
