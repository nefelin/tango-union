import { useEffect, useState } from 'react';
import * as React from 'react';
import BaseTable, { AutoResizer } from 'react-base-table';

import { PlaylistTrack } from '../../hooks/state/usePlaylistsState/types';
import { tupleIdFromPlaylistTrack } from '../../hooks/state/usePlaylistsState/util';
import { usePlaylistState } from '../../hooks/state/usePlaylistState';
import { useSelectionState } from '../../hooks/state/useSelectionState';
import useKeyboardShortcut from '../../hooks/useKeyboardShortcut';
import { Maybe } from '../../types/utility/maybe';
import { playlistRowRenderer } from './DraggableTrack';
import { PlaylistContainer, TableContainer } from './PlaylistBody/styles';
import { moveMany } from './PlaylistBody/util';
import playlistColumns from './playlistColumns';

const PlaylistBody = ({ tracks }: { tracks: Maybe<Array<PlaylistTrack>> }) => {
  const { selectionStatus, selected, removeSelected } = useSelectionState();
  const { rearrangeTracks, removeTracks } = usePlaylistState('quicklist');
  const [orderedTracks, setOrderedTracks] = useState(tracks ?? []);
  const trackIds = orderedTracks.map(tupleIdFromPlaylistTrack);

  useKeyboardShortcut(['Backspace', 'Delete'], () => {
    removeTracks(...selected());
    removeSelected(...selected());
  }); // fixme will be problematic if rendering multiple playlists

  useEffect(() => setOrderedTracks(tracks ?? []), [tracks]);

  const [dragging, setDragging] = useState(false);

  // const handleDragEnd = (event: DragEndEvent) => {
  //   const { active, over } = event;
  //
  //   if (!over?.id || !active.id) {
  //     return;
  //   }
  //
  //   const activeIndex = trackIds.findIndex((id) => id[1] === active.id);
  //   const overIndex = trackIds.findIndex((id) => id[1] === over?.id);
  //
  //   if (selectionStatus(over.id) === null) {
  //     rearrangeTracks(
  //       moveMany(trackIds, selected(), over.id, overIndex > activeIndex),
  //     );
  //   }

    // const { active, over } = event;
    // setDragging(false);
    //
    // if (active && over && active.id !== over.id) {
    //   const oldIndex = tracks.findIndex(
    //     ({ id }) => id.toString() === active.id,
    //   );
    //   const newIndex = tracks.findIndex(({ id }) => id.toString() === over.id);
    //   replaceTracks(arrayMove(tracks, oldIndex, newIndex).map(({ id }) => id));
    // }
  // };

  return (
    <PlaylistContainer>
      <TableContainer>
        <AutoResizer>
          {({ width, height }) => {
            return (
              <BaseTable
                style={{ fontSize: 12 }}
                rowKey="localSongId"
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
            );
          }}
        </AutoResizer>
      </TableContainer>
    </PlaylistContainer>
  );
};

export default PlaylistBody;
