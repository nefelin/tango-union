import { Option } from 'react-select/src/filters';

import { Maybe } from '../../types';

export interface SearchbarState {
  orchestra: Maybe<Array<Option>>;
  singer: Maybe<Array<Option>>;
  genre: Maybe<Array<Option>>;
  search: string;
  sort: Record<string, 'asc' | 'desc'>;
}
