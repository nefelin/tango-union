import React, { useEffect, useRef, useState } from 'react';

import { Datum } from './BarGraph/types';

interface Props {
  data: Array<Datum<number>>;
}

const MobileBarGraph = ({ data }: Props) => {
  const graphRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    setContainerHeight(graphRef.current?.getBoundingClientRect().height ?? 0);
  }, [graphRef]);
  const maxVal = Math.max(...data.map(({ value }) => value));

  const floorHeightPx = 4;
  const textSvgBoxHeight = 18;
  const bufferedHeight = containerHeight - floorHeightPx - textSvgBoxHeight * 2;
  const scale = bufferedHeight / maxVal;

  return (
    <>
      <div ref={graphRef} className="flex flex-row h-full items-end w-full">
        {data.map(({ label, value }, i) => {
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
                style={{ height: barHeight, backgroundColor: bgColor }}
                className="bg-black border border-black rounded-t-sm transition-all duration-500 ease-out w-full"
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
