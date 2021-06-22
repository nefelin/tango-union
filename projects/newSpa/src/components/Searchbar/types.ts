import type { Option } from 'react-select/src/filters';

import type { Maybe } from '../../types';

export interface SearchbarState {
  orchestra: Maybe<Array<Option>>;
  singer: Maybe<Array<Option>>;
  genre: Maybe<Array<Option>>;
  search: string;
}

export const initSearchbarState: SearchbarState = {
  search: '',
  orchestra: [],
  singer: [],
  genre: [],
};
