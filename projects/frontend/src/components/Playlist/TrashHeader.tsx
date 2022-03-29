import { DeleteOutline } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import React, { useContext } from 'react';

import { PlaylistConfigContext } from '../../context/playlistConfig.context';
import { deleteSelectedTracks } from '../../hooks/state/useGlobalPlaylistState/songLists.state';
import { useDroppable } from '../DragNDrop/hooks/useDroppable';
import { droppableBgColor } from './EmptyPlaylist';

export const TRASH_DROPPABLE_ID = 'trashcan';
const TrashHeader = () => {
  const { listeners, isOver } = useDroppable(TRASH_DROPPABLE_ID);
  const { name: playListId } = useContext(PlaylistConfigContext);

  return (
    <Tooltip title="Delete Selected">
      <div
        role="button"
        tabIndex={0}
        onClick={() => deleteSelectedTracks(playListId)}
        onKeyDown={({ key }) =>
          ['Space', 'Enter'].includes(key) && deleteSelectedTracks(playListId)
        }
        style={{
          borderRadius: '2px',
          cursor: isOver ? 'inherit' : 'pointer',
          backgroundColor: isOver ? droppableBgColor : 'inherit',
        }}
        {...listeners}
      >
        <DeleteOutline />
      </div>
    </Tooltip>
  );
};
export default TrashHeader;
