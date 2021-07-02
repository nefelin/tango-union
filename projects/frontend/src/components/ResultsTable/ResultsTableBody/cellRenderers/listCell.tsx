import React from 'react';

import { CellProps } from './types';

export const ListCell = ({ song, column: { key } }: CellProps) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const value = song[key as keyof CellProps['song']];
  return <span>{Array.isArray(value) ? value?.join(', ') : value}</span>;
};
