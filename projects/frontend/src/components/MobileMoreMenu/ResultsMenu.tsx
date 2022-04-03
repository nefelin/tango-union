import { useReactiveVar } from '@apollo/client';
import { Alert, MenuItem, Snackbar } from '@mui/material';
import React from 'react';

import { reactiveMoreState } from '../../features/MobileDash/reactiveMoreState';
import { QUICKLIST_PLAYLIST_ID } from '../../hooks/state/useGlobalPlaylistState/songLists.state';
import { usePlaylistState } from '../../hooks/state/usePlaylistState';
import { useSearchbarState } from '../../hooks/state/useSearchbarState';
import { CompactTrack } from '../../types/compactTrack/types';
const ResultsMenu = ({ track }: { track: CompactTrack }) => {
  const { addTracks } = usePlaylistState(QUICKLIST_PLAYLIST_ID);
  const { searchFromIds } = useSearchbarState();

  const closeMore = () => reactiveMoreState(null);

  const handleAddToPlaylist = () => {
    addTracks([track.trackId]);
    closeMore();
  };

  const handleSearchSimilar = () => {
    searchFromIds([track]);
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
      <Snackbar
        open={true}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success" variant="filled" onClose={() => {}}>
          Playlist Link Copied to Clipboard!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ResultsMenu;
