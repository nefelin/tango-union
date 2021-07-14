import { makeVar } from '@apollo/client';

import { SearchbarState } from './types';

export const initSearchbarState: SearchbarState = {};

const reactiveSearchbarState = makeVar(initSearchbarState);

export const resetSearch = () => reactiveSearchbarState(initSearchbarState);

export default reactiveSearchbarState;
