import { makeVar, useReactiveVar } from '@apollo/client';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { CSSProperties, MouseEvent, useState } from 'react';
import { BaseTableProps } from 'react-base-table';

import { SimpleTrack } from '../../../generated/graphql';
import { useYoutubePlayerState } from '../../hooks/state/useYoutubePlayerState';
import PlayableRow from '../PlayableRow';

interface Props {
  cells: Array<React.ReactNode>;
  rowData: SimpleTrack;
}

export const playlistRowRenderer =
  (): BaseTableProps<SimpleTrack>['rowRenderer'] =>
  ({ cells, rowData }) =>
    <DraggableTrack cells={cells} rowData={rowData} />;

const reactiveSelectedTracks = makeVar<Array<string>>([]);

export const useSelection = (id = '-1') => {
  // fixme handle copying
  const selected = useReactiveVar(reactiveSelectedTracks);
  const [startedSelected, setStartedSelected] = useState(false);

  const addSelected = () => {
    reactiveSelectedTracks([...reactiveSelectedTracks(), id]);
  };

  const removeSelected = () => {
    reactiveSelectedTracks(
      reactiveSelectedTracks().filter((listId) => id !== listId),
    );
  };

  const toggleSelected = () => {
    if (selected.includes(id)) {
      removeSelected();
    } else {
      addSelected();
    }
  };

  // late night bad decision, sort of overloading this function to work in two contexts....
  const isSelected = (checkId?: string) => selected.includes(checkId || id);

  const replaceSelected = () => reactiveSelectedTracks([id]);

  const mouseHandlers = {
    onMouseDown: (e: MouseEvent) => {
      // fixme at proper shift selecting
      if (!isSelected()) {
        if (e.metaKey || e.shiftKey) {
          addSelected();
          setStartedSelected(false);
        } else {
          replaceSelected();
          setStartedSelected(true);
        }
      } else {
        setStartedSelected(true);
      }
    },

    onMouseUp: (e: MouseEvent) => {
      if (isSelected() && startedSelected) {
        if (e.metaKey || e.shiftKey) {
          removeSelected();
        } else {
          replaceSelected();
        }
      }
    },
  };

  return {
    selected,
    isSelected,
    toggleSelected,
    replaceSelected,
    addSelected,
    removeSelected,
    mouseHandlers,
  };
};

const DraggableTrack = ({ rowData: track, cells }: Props) => {
  const { trackStatus, play } = useYoutubePlayerState();
  const status = trackStatus(track.id, 'playlist');

  const { isSelected, mouseHandlers } = useSelection(track.id.toString());

  const id = track.id.toString();

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

  return (
    <>
      {isDragging && (
        <PlayableRow
          style={{ position: 'absolute', zIndex: 11 }}
          status={status}
          selected={isSelected()}
        >
          {cells}
        </PlayableRow>
      )}
      <PlayableRow
        status={status}
        selected={isSelected()}
        onDoubleClick={() => play(track.id, 'playlist')}
        ref={setNodeRef}
        style={isDragging ? draggingStyle : {}}
        {...attributes}
        {...listeners}
        {...mouseHandlers}
      >
        {!isDragging && cells}
      </PlayableRow>
    </>
  );
};

export default DraggableTrack;
