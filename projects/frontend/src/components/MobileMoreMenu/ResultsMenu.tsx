import { Alert, MenuItem, Snackbar } from '@mui/material';
import React from 'react';

import { reactiveMoreState } from '../../features/MobileDash/reactiveMoreState';
import { QUICKLIST_PLAYLIST_ID } from '../../hooks/state/useGlobalPlaylistState/songLists.state';
import { usePlaylistState } from '../../hooks/state/usePlaylistState';
import { useSearchbarState } from '../../hooks/state/useSearchbarState';
import useSnackbars from '../../hooks/useSnackbars';
import { CompactTrack } from '../../types/compactTrack/types';
const ResultsMenu = ({ track }: { track: CompactTrack }) => {
  const { addTracks } = usePlaylistState(QUICKLIST_PLAYLIST_ID);
  const { searchFromIds } = useSearchbarState();
  const {addSnack} = useSnackbars();

  const closeMore = () => reactiveMoreState(null);

  const handleAddToPlaylist = () => {
    addTracks([track.trackId]);
    addSnack({severity: 'info', content: 'Track added to playlist'})
    closeMore();
  };

  const handleSearchSimilar = () => {
    searchFromIds([track]);
    addSnack({severity: 'info', content: 'Search filters updated'})
    closeMore();
  };

  return (
    <>
      <MenuItem onClick={handleAddToPlaylist}>Add to playlist</MenuItem>
      <MenuItem disabled>Share Search</MenuItem>
      <MenuItem disabled>Share Song</MenuItem>
      <MenuItem onClick={handleSearchSimilar}>Search similar</MenuItem>
      <MenuItem disabled>Sort results...</MenuItem>
      <MenuItem onClick={closeMore}>Close</MenuItem>
    </>
  );
};

export default ResultsMenu;
