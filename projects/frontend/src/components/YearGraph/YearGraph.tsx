import React, { forwardRef, FunctionComponent, HTMLAttributes, memo, PropsWithChildren, useRef, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import styled from 'styled-components';

import useEnsureValue from '../../hooks/useEnsureValue';
import { Maybe } from '../../types/utility/maybe';

interface Props {
  maxYear: number;
  minYear: number;
  data: Record<string, number>;
}

const YearGraph = ({ data, maxYear, minYear }: Props) => {
  const [hoveredYear, setHoveredYear] = useState<Maybe<string>>(null);
  const displayYear = useEnsureValue(hoveredYear);
  const [displayX, setDisplayX] = useState(0);
  const graphRef = useRef<HTMLDivElement>(null);
  const yearDisplayRef = useRef<HTMLDivElement>(null);

  const maxCount = Math.max(...Object.values(data));

  // eslint-disable-next-line no-plusplus
  for (let year = minYear; year < maxYear; year++) {
    // fixme need a more nuanced trim, this will flatten missing year in middle of group which we dont want.
    if (data[year] === undefined) {
      // eslint-disable-next-line no-param-reassign
      data[year.toString()] = 0;
    }
  }

  // console.log(data)

  return (
    <YearGraphContainer ref={graphRef}>
      {Object.entries(data).map(([year, count]) => {
        const group = Math.floor((parseInt(year, 10) % 100) / 10);

        const percent = Math.max((count / maxCount) * 100, 0.5);
        return (
          <YearBarContainer
            onMouseOver={(e) => {
              const rect = graphRef.current?.getBoundingClientRect();
              const displRect = yearDisplayRef.current?.getBoundingClientRect();
              if (!rect || !displRect) return;
              const x = e.clientX - rect.left - displRect.width - 10;
              unstable_batchedUpdates(() => {
                setDisplayX(x);
                setHoveredYear(year);
              });
            }}
            onMouseOut={() => setHoveredYear(null)}
            key={year}
            percent={percent}
            color={colors[group] || ''}
            hovered={hoveredYear === year}
          />
        );
      })}
      <YearDisplay
        ref={yearDisplayRef}
        x={displayX}
        hide={hoveredYear === null}
      >
        {displayYear}
      </YearDisplay>
    </YearGraphContainer>
  );
};

const YearBarContainer = ({
  percent,
  color,
  hovered,
  ...divProps
}: HTMLAttributes<HTMLDivElement> & YearBarProps) => {
  return (
    <div
      style={{
        boxSizing: 'border-box',
        paddingTop: '4px',
        display: 'flex',
        alignItems: 'flex-end',
        paddingRight: 1,
        height: '100%',
        width: '8px',
        transition: 'all 1s',
        borderTop: '2px solid dimgrey',
      }}
      {...divProps}
    >
      <YearBar {...{ hovered, percent, color }} />
    </div>
  );
};

const randomColor = (seed: number) => {
  const even = seed % 2 === 0;
  const greenFloor = even ? 150 : 50;

  const g = 100;
  const r = 5 * seed + greenFloor;
  const b = 15 * seed + 100;

  return `rgb(${r},${g},${b})`;
};
const colors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((seed) => randomColor(seed));

interface YearDisplayProps {
  hide: boolean;
  x: number;
}

const YearDisplay= forwardRef<HTMLDivElement, PropsWithChildren<YearDisplayProps>>(({ hide, x, children }, ref) => (
  <div
    ref={ref}
    style={{
      userSelect: 'none',
      pointerEvents: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      visibility: hide ? 'hidden' : 'visible',
      opacity: hide ? 0 : '1',
      transition: `all ${hide ? '400ms' : '200ms'}, left 0s`,
      position: 'absolute',
      left: `${x}px`,
      top: '0',
      width: '40px',
      height: '20px',
      backgroundColor: 'white',
      fontWeight: 'bold',
      borderRadius: '5px',
    }}
  >{children}</div>
));

const YearGraphContainer = styled.div`
  align-self: flex-end;
  position: relative;
  display: inline-flex;
  flex-direction: row;
  align-items: flex-end;
  //width: 300px;
  height: 38px;
  padding: 1px;
  //border-bottom: 1px solid black;
  transition: all 400ms;
`;

interface YearBarProps {
  percent: number;
  color: string;
  hovered: boolean;
}

const YearBar = ({ percent, color, hovered }: YearBarProps) => (
  <div
    style={{
      boxSizing: 'border-box',
      height: `${percent}%`,
      backgroundColor: hovered ? 'black' : color,
      width: '100%',
      transition: 'all 1s, background-color 0s',
      borderRadius: 1,
      minHeight: percent === 0 ? '1px' : '2px',
    }}
  />
);

export default memo(YearGraph);
