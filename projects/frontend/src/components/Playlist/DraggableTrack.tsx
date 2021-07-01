import { makeVar, useReactiveVar } from '@apollo/client';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { CSSProperties, MouseEvent, useState } from 'react';
import { BaseTableProps } from 'react-base-table';

import { SimpleTrack } from '../../../generated/graphql';
import PlayableRow from '../PlayableRow';
import {
  playTrackId,
  useTrackStatus,
} from '../YoutubePlayer/youtubePlayer.state';

interface Props {
  cells: Array<React.ReactNode>;
  rowData: SimpleTrack;
}

export const playlistRowRenderer =
  (): BaseTableProps<SimpleTrack>['rowRenderer'] =>
  ({ cells, rowData }) =>
    <DraggableTrack cells={cells} rowData={rowData} />;

const reactiveSelectedTracks = makeVar<Array<string>>([]);

export const useSelectedTracks = () => {
  const selected = useReactiveVar(reactiveSelectedTracks);

  const addSelected = (id: string) => {
    reactiveSelectedTracks([...reactiveSelectedTracks(), id]);
  };

  const removeSelected = (id: string) => {
    reactiveSelectedTracks(
      reactiveSelectedTracks().filter((listId) => id !== listId),
    );
  };

  const toggleSelected = (id: string) => {
    if (selected.includes(id)) {
      removeSelected(id);
    } else {
      addSelected(id);
    }
  };

  const isSelected = (id: string) => selected.includes(id);

  const replaceSelected = (...id: Array<string>) => reactiveSelectedTracks(id);

  return {
    selected,
    isSelected,
    toggleSelected,
    replaceSelected,
    addSelected,
    removeSelected,
  };
};

const DraggableTrack = ({ rowData: track, cells }: Props) => {
  const status = useTrackStatus(track.id, 'playlist');

  const [startedSelected, setStartedSelected] = useState(false);
  const { isSelected, removeSelected, replaceSelected, addSelected } =
    useSelectedTracks();

  const id = track.id.toString();
  const selected = isSelected(id);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const draggingStyle: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    height: 1,
    border: 'none',
    backgroundColor: 'blue',
    width: '100%',
    zIndex: 10,
  };

  const handleMouseDown = (e: MouseEvent) => {
    // fixme at proper shift selecting
    if (!selected) {
      if (e.metaKey || e.shiftKey) {
        // fixme confusing nightmare
        addSelected(id);
        setStartedSelected(false);
      } else {
        replaceSelected(id);
        setStartedSelected(true);
      }
    } else {
      setStartedSelected(true);
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (selected && startedSelected) {
      if (e.metaKey || e.shiftKey) {
        removeSelected(id);
      } else {
        replaceSelected(id);
      }
    }
  };

  return (
    <>
      {isDragging && (
        <PlayableRow
          style={{ position: 'absolute', zIndex: 11 }}
          status={status}
          selected={selected}
        >
          {cells}
        </PlayableRow>
      )}
      <PlayableRow
        status={status}
        selected={selected}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onDoubleClick={() => playTrackId(track.id, 'playlist')}
        ref={setNodeRef}
        style={isDragging ? draggingStyle : {}}
        {...attributes}
        {...listeners}
      >
        {!isDragging && cells}
      </PlayableRow>
    </>
  );
};

export default DraggableTrack;
