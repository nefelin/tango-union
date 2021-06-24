import { makeVar } from '@apollo/client';

import { initSearchbarState } from './types';

const reactiveSearchbarState = makeVar(initSearchbarState);

export const sortSearch = (sort: Record<string, 'asc' | 'desc'>) => {
  reactiveSearchbarState({ ...reactiveSearchbarState(), sort });
};

export default reactiveSearchbarState;
