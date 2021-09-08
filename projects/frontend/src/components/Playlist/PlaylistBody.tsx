import { useContext, useEffect, useState } from 'react';
import * as React from 'react';
import BaseTable, { AutoResizer } from 'react-base-table';

import { QUICKLIST_PLAYLIST_ID } from '../../hooks/state/useGlobalPlaylistState/songLists.state';
import { PlaylistTrack } from '../../hooks/state/usePlaylistsState/types';
import { usePlaylistState } from '../../hooks/state/usePlaylistState';
import { useSelectionState } from '../../hooks/state/useSelectionState';
import useKeyboardShortcut from '../../hooks/useKeyboardShortcut';
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
  const { selectionStatus, selected, removeSelected } = useSelectionState();
  const { rearrangeTracks, removeTracks } = usePlaylistState(
    QUICKLIST_PLAYLIST_ID,
  );
  const [orderedTracks, setOrderedTracks] = useState(tracks ?? []);

  useKeyboardShortcut(['Backspace', 'Delete'], () => {
    removeTracks(...selected());
    removeSelected(...selected());
  }); // fixme will be problematic if rendering multiple playlists

  useEffect(() => setOrderedTracks(tracks ?? []), [tracks]);

  return (
    <PlaylistContainer>
      {tracks?.length === 0 ? (
        <EmptyPlaylist />
      ) : (
        <TableContainer>
          <AutoResizer>
            {({ width, height }) => {
              return (
                <BaseTableStyleOverrides dragging={!!dragMode}>
                  <BaseTable
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
                  />
                </BaseTableStyleOverrides>
              );
            }}
          </AutoResizer>
        </TableContainer>
      )}
    </PlaylistContainer>
  );
};

export default PlaylistBody;
