import React from 'react';

import { timeStringFromSeconds } from '../util';
import { CellProps } from './types';

export const LengthCell = ({ song }: CellProps) => (
  <span>
    {song.secondsLong ? timeStringFromSeconds(song.secondsLong) : '--'}
  </span>
);
