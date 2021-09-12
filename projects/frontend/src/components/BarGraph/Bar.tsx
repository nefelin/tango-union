import React, { HTMLAttributes } from 'react';

import { BarFill, YearBarProps } from './BarFill';

const Bar = ({
  percent,
  color,
  hovered,
  selected,
  ...divProps
}: HTMLAttributes<HTMLDivElement> & YearBarProps) => {
  const backgroundColor = selected  ? 'inherit' : 'rgb(220,220,240)'
  return (
    <div
      onDragStart={(e) => e.preventDefault()}
      style={{
        // border: hovered ? '1px solid black' : 'none',
        backgroundColor,
        boxSizing: 'border-box',
        paddingTop: '4px',
        display: 'flex',
        alignItems: 'flex-end',
        height: '100%',
        width: '8px',
        transition: 'all 1s, background-color 0s',
        marginRight: 1,
        borderRight: backgroundColor,
        // borderTop: '2px solid dimgrey',
      }}
      {...divProps}
    >
      <BarFill {...{ selected, hovered, percent, color }} />
    </div>
  );
};

export default Bar;
