import React from 'react';

export interface YearBarProps {
  barHeight: number;
  color: string;
  hovered: boolean;
  selected: boolean;
}

export const BarFill = ({ selected, barHeight, color, hovered }: YearBarProps) => {
  const backgroundColor = selected || hovered ? color : 'black'

  return (
    <div
      onDragStart={(e) => e.preventDefault()}
      style={{
        boxSizing: 'border-box',
        height: `${barHeight}px`,
        backgroundColor,
        width: '100%',
        transition: 'all 1s, background-color 0s',
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
      }}
    />
  )
}