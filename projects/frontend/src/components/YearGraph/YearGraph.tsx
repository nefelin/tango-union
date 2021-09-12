import React, { HTMLAttributes, useRef, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import styled from 'styled-components';

import useEnsureValue from '../../hooks/useEnsureValue';
import { Maybe } from '../../types/utility/maybe';

interface Props {
  data: Record<string, number>;
}

const YearGraph = ({ data }: Props) => {
  const [hoveredYear, setHoveredYear] = useState<Maybe<string>>(null);
  const displayYear = useEnsureValue(hoveredYear);
  const [displayX, setDisplayX] = useState(0);
  const graphRef = useRef<HTMLDivElement>(null);
  const yearDisplayRef = useRef<HTMLDivElement>(null);

  const maxCount = Math.max(...Object.values(data));

  // eslint-disable-next-line no-plusplus
  for (let year = 1830; year < 2020; year++){
    if (data[year] === undefined) {
      // eslint-disable-next-line no-param-reassign
      data[year.toString()] = -1;
    }
  }

  console.log(data)

  return (
    <YearGraphContainer ref={graphRef}>
      {Object.entries(data).map(([year, count]) => {
        const group = Math.floor((parseInt(year, 10) % 100) / 10);

        const percent = count === -1 ? 0 : (count / maxCount) * 100;
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
            flatten={count === -1}
          />
        );
      })}
      <YearDisplay ref={yearDisplayRef} x={displayX} hide={hoveredYear === null}>
        {displayYear}
      </YearDisplay>
    </YearGraphContainer>
  );
};

const YearBarContainer = ({
  percent,
  color,
  hovered,
  flatten,
  ...divProps
}: HTMLAttributes<HTMLDivElement> & YearBarProps) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        paddingRight: flatten ? 0 : 1,
        height: '100%',
        width: flatten ? 0 : '4px',
        transition: 'all 1s'
      }}
      {...divProps}
    >
      <YearBar {...{hovered, percent, color, flatten }} />
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

const YearDisplay = styled.div<{ hide: boolean; x: number }>`
  user-select: none;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  // visibility: ${({ hide }) => (hide ? 'hidden' : 'visible')};
  opacity: ${({ hide }) => (hide ? 0 : 1)};
  transition: all ${({ hide }) => (hide ? '400ms' : '200ms')}, left 0s;
  position: absolute;
  left: ${({ x }) => `${x}px`};
  top: 0;
  width: 40px;
  height: 20px;
  background-color: white;
  font-weight: bold;
  border-radius: 5px;
`;

const YearGraphContainer = styled.div`
  margin: 30px;
  position: relative;
  display: inline-flex;
  flex-direction: row;
  align-items: flex-end;
  //width: 300px;
  height: 50px;
  padding: 1px;
  border-bottom: 2px solid black;
  transition: all 400ms;
`;

interface YearBarProps {
  percent: number;
  color: string;
  hovered: boolean;
  flatten: boolean;
}

const YearBar = styled.div<YearBarProps>`
  box-sizing: border-box;
  height: ${({ percent }) => `${percent}%`};
  background-color: ${({ color, hovered }) => (hovered ? 'blueviolet' : color)};
  width:  100%;
  transition: all 1s;
  border-radius: 1px;
  min-height: ${({ percent }) => (percent === 0 ? 0 : '1px')};
`;

export default YearGraph;
