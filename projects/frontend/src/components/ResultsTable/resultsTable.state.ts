import { makeVar, useReactiveVar } from '@apollo/client';

export const reactiveTableRowsVisible = makeVar<[number, number]>([0, 100]);
