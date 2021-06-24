import { makeVar } from '@apollo/client';

import type { SearchbarState } from './types';

export const initSearchbarState: SearchbarState = {
  search: '',
  orchestra: [],
  singer: [],
  genre: [],
  sort: { title: 'asc' },
};

const reactiveSearchbarState = makeVar(initSearchbarState);

export const sortSearch = (sort: Record<string, 'asc' | 'desc'>) => {
  reactiveSearchbarState({ ...reactiveSearchbarState(), sort });
};

export const resetSearch = () => reactiveSearchbarState(initSearchbarState);

export default reactiveSearchbarState;
