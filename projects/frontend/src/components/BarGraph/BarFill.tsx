import React from 'react';

export interface YearBarProps {
  percent: number;
  color: string;
  hovered: boolean;
  selected: boolean;
}

export const BarFill = ({ selected, percent, color, hovered }: YearBarProps) => {
  const backgroundColor = selected || hovered ? color : 'black'

  return (
    <div
      onDragStart={(e) => e.preventDefault()}
      style={{
        boxSizing: 'border-box',
        height: `${percent}%`,
        backgroundColor,
        width: '100%',
        transition: 'all 1s, background-color 0s',
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        minHeight: percent === 0 ? '1px' : '2px',
      }}
    />
  )
}