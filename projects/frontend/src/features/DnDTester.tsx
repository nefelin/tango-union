import React, { useMemo } from 'react';

import DndContext from '../components/DragNDrop/DnDContext';
import { useDroppable } from '../components/DragNDrop/hooks/useDroppable';
import { useSortable } from '../components/DragNDrop/hooks/useSortable';

const DnDTester = () => {
  return (
    <div style={{ margin: 10 }} className="App">
      <DndContext>
        <div style={{ height: 200, padding: 10, overflow: 'scroll' }}>
          {[1, 2, 3, 4, 5].map((id) => (
            <Sortable key={id.toString()} id={id.toString()} />
          ))}
        </div>
        <DropBox />
      </DndContext>
    </div>
  );
};

const DropBox = () => {
  const { listeners } = useDroppable('box');
  return (
    <div
      {...listeners}
      style={{ border: '1px solid black', margin: 20, height: 200, width: 200 }}
    />
  );
};

const Sortable = ({ id }: { id: string }) => {
  const { listeners, isOver, styles } = useSortable(id);
  return useMemo(() => {
    // console.log('render');
    return (
      <div
        {...listeners}
        style={{
          userSelect: 'none',
          // margin: 4,
          width: 200,
          height: 50,
          backgroundColor: 'lightgoldenrodyellow',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          ...styles,
        }}
      >
        {id}
      </div>
    );
  }, [id, isOver, listeners ]);
};

export default DnDTester;
