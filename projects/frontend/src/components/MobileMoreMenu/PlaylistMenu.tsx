import { MenuItem } from '@mui/material';
import React from 'react';

import { reactiveMoreState } from '../../features/MobileDash/reactiveMoreState';
import { QUICKLIST_PLAYLIST_ID } from '../../hooks/state/useGlobalPlaylistState/songLists.state';
import { usePlaylistState } from '../../hooks/state/usePlaylistState';
import { useSearchbarState } from '../../hooks/state/useSearchbarState';
import useSnackbars from '../../hooks/useSnackbars';
import { CompactTrack } from '../../types/compactTrack/types';
import { urlTrackParams } from '../../util/urlParams';
import { handleSearchSimilar, handleShare } from './sharedHandlers';
const PlaylistMenu = ({ track }: { track: CompactTrack }) => {
  const { replaceTracks, removeTracks, playlist } = usePlaylistState(
    QUICKLIST_PLAYLIST_ID,
  );
  const { searchFromIds } = useSearchbarState();
  const { addSnack } = useSnackbars();

  const closeMore = () => reactiveMoreState(null);

  const handleClearPlaylist = () => {
    replaceTracks([]);
    closeMore();
  };

  const handleRemoveTrack = () => {
    removeTracks(track.listId);
    closeMore();
  };

  return (
    <>
      <MenuItem onClick={handleClearPlaylist}>Clear playlist</MenuItem>
      <MenuItem onClick={handleRemoveTrack}>Remove from playlist</MenuItem>
      <MenuItem
        onClick={handleShare({
          params: JSON.stringify(urlTrackParams(playlist.tracks)),
          closeMore,
          addSnack,
        })}
      >
        Share playlist
      </MenuItem>
      <MenuItem
        onClick={handleShare({
          params: JSON.stringify(urlTrackParams([track])),
          closeMore,
          addSnack,
        })}
      >
        Share song
      </MenuItem>
      <MenuItem
        onClick={handleSearchSimilar({
          track,
          closeMore,
          searchFromIds,
          addSnack,
        })}
      >
        Search similar
      </MenuItem>
      <MenuItem onClick={closeMore}>Close</MenuItem>
    </>
  );
};

export default PlaylistMenu;
