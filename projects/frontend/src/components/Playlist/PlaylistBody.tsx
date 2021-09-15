import { useContext, useEffect, useRef, useState } from 'react';
import * as React from 'react';
import BaseTable, { AutoResizer } from 'react-base-table';

import { PlaylistConfigContext } from '../../context/playlistConfig.context';
import { reactiveSongLists } from '../../hooks/state/useGlobalPlaylistState/songLists.state';
import {
  PlaylistTrack,
} from '../../hooks/state/usePlaylistsState/types';
import { usePlaylistState } from '../../hooks/state/usePlaylistState';
import { useSelectionState } from '../../hooks/state/useSelectionState';
import { FocusContext, useFocusable } from '../../hooks/useFocusable';
import { useDeleteShortcut, useSelectAllShortcut } from '../../hooks/useKeyboardShortcut';
import { Maybe } from '../../types/utility/maybe';
import BaseTableStyleOverrides from '../BaseTableStyleOverrides/BaseTableStyleOverrides';
import { DndMonitorContext } from '../DragNDrop/store/context';
import EmptyPlaylist from './EmptyPlaylist';
import { PlaylistContainer, TableContainer } from './PlaylistBody/styles';
import playlistColumns from './playlistColumns';
import { playlistRowRenderer } from './SortableTrack';

const PlaylistBody = ({ tracks }: { tracks: Maybe<Array<PlaylistTrack>> }) => {
  const {
    state: { dragMode },
  } = useContext(DndMonitorContext);
  const { name: playlistId } = useContext(PlaylistConfigContext);
  const [orderedTracks, setOrderedTracks] = useState(tracks ?? []);
  const playlistRef = useRef<HTMLDivElement>(null);
  const {focused} = useContext(FocusContext);
  const {removeSelected } = useSelectionState()
  const {removeTracks} = usePlaylistState(playlistId)
  useFocusable(playlistRef, playlistId);

  const handleKeyDown = (e: KeyboardEvent) => {
    const {key } = e;
    const selection = reactiveSongLists()[focused || '']?.selection || new Set()
    if (['Delete', 'Backspace'].includes(key) && focused && selection.size ) {
      removeTracks(...selection)
      removeSelected(...selection)
      e.preventDefault();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  });

  useEffect(() => setOrderedTracks(tracks ?? []), [tracks]);

  return (
    <PlaylistContainer ref={playlistRef}>
      <TableContainer>
        <AutoResizer>
          {({ width, height }) => {
            return (
              <BaseTableStyleOverrides dragging={!!dragMode}>
                <BaseTable
                  emptyRenderer={() => <EmptyPlaylist />}
                  style={{ fontSize: 12 }}
                  rowKey="listId"
                  data={tracks?.map((track, index) => ({
                    ...track,
                    fakeId: `${track.id}_${index}`, // gnarly way to allow duplicate rows
                  }))}
                  columns={playlistColumns}
                  width={width}
                  height={height}
                  headerHeight={40}
                  rowHeight={30}
                  rowRenderer={playlistRowRenderer()}
                  footerHeight={height - 40 - 30*(tracks?.length??0)}
                  footerRenderer={<EmptyPlaylist/>}
                />
              </BaseTableStyleOverrides>
            );
          }}
        </AutoResizer>
      </TableContainer>
    </PlaylistContainer>
  );
};

export default PlaylistBody;
