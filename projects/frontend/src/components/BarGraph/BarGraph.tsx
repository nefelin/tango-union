import React, {
  forwardRef,
  memo,
  MouseEvent,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';
// eslint-disable-next-line camelcase
import { unstable_batchedUpdates } from 'react-dom';

import useEnsureValue from '../../hooks/useEnsureValue';
import { Maybe } from '../../types/utility/maybe';
import Bar from './Bar';
import BarGraphContainer from './BarGraphContainer';

interface Props {
  data: Array<Datum<number>>;
  selected: Array<Datum<number>['label']>;
}

type DragMode = 'select' | 'deselect';

const BarGraph = ({ data, selected }: Props) => {
  const [hoveredYear, setHoveredYear] = useState<Maybe<string>>(null);
  const displayYear = useEnsureValue(hoveredYear);
  const [displayX, setDisplayX] = useState(0);
  const graphRef = useRef<HTMLDivElement>(null);
  const yearDisplayRef = useRef<HTMLDivElement>(null);
  const [dragMode, setDragMode] = useState<DragMode>();
  const [innerSelected, setInnerSelected] = useState(new Set(selected));
  const [gestureStart, setGestureStart] = useState(0);

  useEffect(() => {
    const selectedWithFallback = selected.length ? selected : data.map(({label}) => label)
    setInnerSelected(new Set(selectedWithFallback));
  }, [selected]);

  const maxCount = Math.max(...data.map(({ value }) => value));
  // console.log(data)

  const toggleInnerSelected = (year: string) => {
    if (innerSelected.has(year)) {
      setInnerSelected((prev) => {
        prev.delete(year);
        return prev;
      });
    } else {
      setInnerSelected((prev) => {
        prev.add(year);
        return prev;
      });
    }
  };

  const handleMouseDown = (year: string) => (e: MouseEvent) => {
    let newMode: DragMode | undefined;
    const indexOfStart = data.findIndex(({ label }) => label === year);
    if (innerSelected.has(year)) {
      newMode = 'deselect';
    } else {
      newMode = 'select';
    }
    unstable_batchedUpdates(() => {
      setDragMode(newMode);
      setGestureStart(indexOfStart);
      toggleInnerSelected(year)
    });
  };

  const handleMouseUp = (e: MouseEvent) => {
    setDragMode(undefined);
  };

  const handleMouseOver = (year: string) => (e: MouseEvent) => {
    // handle selection
    // const overIndex = data.findIndex(({label}) => label===year);
    // const [start, end] = gestureStart < overIndex ? [gestureStart, overIndex] : [overIndex, gestureStart];
    // const targets = data.slice(start, end+1).map(({label}) => label);
    // if (dragMode === 'select') {
    //   setInnerSelected((prev) => {
    //     targets.forEach(label => prev.add(label))
    //     return prev;
    //   });
    // }
    // if (dragMode === 'deselect') {
    //   setInnerSelected((prev) => {
    //     targets.forEach(label => prev.delete(label))
    //     return prev;
    //   });
    // }

    // handle hover stuff
    const rect = graphRef.current?.getBoundingClientRect();
    const displRect = yearDisplayRef.current?.getBoundingClientRect();
    if (!rect || !displRect) return;
    const x = e.clientX - rect.left - displRect.width - 10;
    // unstable_batchedUpdates(() => {
    setDisplayX(x);
    setHoveredYear(year);
    // });
  };

  return (
    <BarGraphContainer ref={graphRef}>
      {data.map(({ label: year, value: count }) => {
        const group = Math.floor((parseInt(year, 10) % 100) / 10);

        const percent = Math.max((count / maxCount) * 100, 0.5);
        return (
          <Bar
            // onDoubleClick={(e) => {
            //   console.log('double');
            //   e.preventDefault();
            // }}
            // onMouseDown={handleMouseDown(year)}
            onMouseOver={handleMouseOver(year)}
            onMouseOut={() => setHoveredYear(null)}
            // onMouseUp={handleMouseUp}
            key={year}
            percent={percent}
            color={colors[group] || ''}
            hovered={hoveredYear === year}
            selected={innerSelected.has(year)}
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
    </BarGraphContainer>
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

const YearDisplay = forwardRef<
  HTMLDivElement,
  PropsWithChildren<YearDisplayProps>
>(({ hide, x, children }, ref) => (
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
  >
    {children}
  </div>
));

export default memo(BarGraph);
