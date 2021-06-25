import { makeVar } from '@apollo/client';

import type { SimpleTrack } from '../../../generated/graphql';

type TableResults = Array<SimpleTrack>;

const initResults:TableResults = [];

export const reactiveTableResults = makeVar(initResults);