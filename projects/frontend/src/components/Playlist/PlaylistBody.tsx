import { useContext, useEffect, useState } from 'react';
import * as React from 'react';
import BaseTable, { AutoResizer } from 'react-base-table';

import {
  QUICKLIST_PLAYLIST_ID,
  reactiveSongLists,
} from '../../hooks/state/useGlobalPlaylistState/songLists.state';
import {
  Playlist,
  PlaylistTrack,
} from '../../hooks/state/usePlaylistsState/types';
import { usePlaylistState } from '../../hooks/state/usePlaylistState';
import {
  reactiveActivePlaylistId,
  useSelectionState,
} from '../../hooks/state/useSelectionState';
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
  const { selectionStatus, selected, removeSelected, replaceSelected } =
    useSelectionState();
  const { rearrangeTracks, removeTracks } = usePlaylistState(
    QUICKLIST_PLAYLIST_ID,
  );
  const [orderedTracks, setOrderedTracks] = useState(tracks ?? []);

  // useKeyboardShortcut(['Backspace', 'Delete'], () => {
  //   removeTracks(...selected());
  //   removeSelected(...selected());
  // }); // fixme will be problematic if rendering multiple playlists

  useKeyboardShortcut(
    ['a'],
    () => {
      const activeId = reactiveActivePlaylistId() ?? '';
      const list = reactiveSongLists()[activeId];
      if (!list) return;

      const replacementList: Playlist = {
        ...list,
        selection: new Set(list.tracks.map(({ listId }) => listId)),
      };

      reactiveSongLists({
        ...reactiveSongLists(),
        [activeId]: replacementList,
      });
      // replaceSelected(...(tracks?.map(({ listId }) => listId) ?? []));
    },
    ['meta'],
    true,
  );

  useEffect(() => setOrderedTracks(tracks ?? []), [tracks]);

  return (
    <PlaylistContainer>
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
