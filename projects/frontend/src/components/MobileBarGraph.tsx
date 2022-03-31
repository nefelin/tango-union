import React, { useEffect, useRef, useState } from 'react';

import { Unary } from '../types/utility/unary';

interface Props {
  data: Array<number>;
  onSelect: Unary<number>;
}

const MobileBarGraph = ({ onSelect, data }: Props) => {
  const graphRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    setContainerHeight(graphRef.current?.getBoundingClientRect().height ?? 0);
  }, [graphRef]);
  const maxVal = Math.max(...data);

  const floorHeightPx = 4;
  const textSvgBoxHeight = 18;
  const bufferedHeight = containerHeight - floorHeightPx - textSvgBoxHeight * 2;
  const scale = bufferedHeight / maxVal;

  return (
    <>
      <div ref={graphRef} className="flex flex-row h-full items-end w-full">
        {data.map((value , i) => {
          const label = i + `0's`;
          const barHeight = scale * value + floorHeightPx;
          const bgColor = `rgb(${i * 25}, ${i * 10}, 255)`;
          return (
            <div key={label} className="flex flex-col mx-0.5 w-full">
              <svg className="mb-1" viewBox={`0 0 50 ${textSvgBoxHeight}`}>
                <text textAnchor="middle" x="25" y="15">
                  {value}
                </text>
              </svg>
              <div
                tabIndex={0}
                role='button'
                style={{ height: barHeight, backgroundColor: bgColor }}
                className="focus-visible:outline-0 bg-black border border-black rounded-t-sm transition-all duration-500 ease-out w-full cursor-pointer"
                onClick={() => onSelect(i)}
                onKeyDown={({ key }) =>
                  key === ' ' || key === 'Enter' ? onSelect(i) : null
                }
              />
              <svg className="mt-0.5" viewBox={`0 0 50 ${textSvgBoxHeight}`}>
                <text textAnchor="middle" x="25" y="15">
                  {label}
                </text>
              </svg>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MobileBarGraph;
