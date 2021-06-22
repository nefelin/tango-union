import { makeVar } from '@apollo/client';

import { initSearchbarState } from '../../components/Searchbar/types';

const reactiveSearchbarState = makeVar(initSearchbarState);

export default reactiveSearchbarState;
