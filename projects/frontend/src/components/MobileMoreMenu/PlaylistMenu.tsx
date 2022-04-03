import { MenuItem } from '@mui/material';
import React from 'react';

import { reactiveMoreState } from '../../features/MobileDash/reactiveMoreState';
import { QUICKLIST_PLAYLIST_ID } from '../../hooks/state/useGlobalPlaylistState/songLists.state';
import { usePlaylistState } from '../../hooks/state/usePlaylistState';
import { useSearchbarState } from '../../hooks/state/useSearchbarState';
import useSnackbars from '../../hooks/useSnackbars';
import { CompactTrack } from '../../types/compactTrack/types';
const PlaylistMenu = ({ track }: { track: CompactTrack }) => {
  const { replaceTracks, removeTracks } = usePlaylistState(QUICKLIST_PLAYLIST_ID);
  const { searchFromIds } = useSearchbarState();
  const {addSnack} = useSnackbars();

  const closeMore = () => reactiveMoreState(null);

  const handleClearPlaylist = () => {
    replaceTracks([]);
    closeMore();
  };

  const handleSearchSimilar = () => {
    searchFromIds([track]);
    addSnack({severity: 'info', content: 'Search filters updated'})
    closeMore();
  };

  const handleRemoveTrack = () => {
    removeTracks(track.listId);
    closeMore();
  }

  return (
    <>
      <MenuItem onClick={handleClearPlaylist}>Clear playlist</MenuItem>
      <MenuItem onClick={handleRemoveTrack}>Remove from playlist</MenuItem>
      <MenuItem disabled>Share playlist</MenuItem>
      <MenuItem disabled>Share song</MenuItem>
      <MenuItem onClick={handleSearchSimilar}>Search similar</MenuItem>
      <MenuItem onClick={closeMore}>Close</MenuItem>
    </>
  );
};

export default PlaylistMenu;
