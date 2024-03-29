import React, { createContext } from 'react';

import { Action } from './actions';
import { initState } from './reducer';
import { State } from './types';

interface Context {
  state: State;
  dispatch?: React.Dispatch<Action>;
}

export const DndMonitorContext = createContext<Context>({ state: initState() });
