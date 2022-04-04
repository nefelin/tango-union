import { MissingFieldError } from '@apollo/client';
import { Divider, MenuItem, Slide, Typography } from '@mui/material';
import React, { useState } from 'react';

import { reactiveMoreState } from '../../features/MobileDash/reactiveMoreState';
import { QUICKLIST_PLAYLIST_ID } from '../../hooks/state/useGlobalPlaylistState/songLists.state';
import { usePlaylistState } from '../../hooks/state/usePlaylistState';
import { useSearchbarState } from '../../hooks/state/useSearchbarState';
import useSnackbars from '../../hooks/useSnackbars';
import { CompactTrack } from '../../types/compactTrack/types';
import { urlSearchParams, urlTrackParams } from '../../util/urlParams';
import SortPanel from '../MobileSort/SortPanel';
import SortRow from '../MobileSort/SortRow';
import { handleShare } from './sharedHandlers';
const ResultsMenu = ({ track }: { track: CompactTrack }) => {
  const { addTracks } = usePlaylistState(QUICKLIST_PLAYLIST_ID);
  const { searchbarState, searchFromIds } = useSearchbarState();
  const { addSnack } = useSnackbars();
  const [sortOpen, setSortOpen] = useState(false);

  const closeMore = () => reactiveMoreState(null);

  const handleAddToPlaylist = () => {
    addTracks([track.trackId]);
    addSnack({ severity: 'info', content: 'Track added to playlist' });
    closeMore();
  };

  const handleSearchSimilar = () => {
    searchFromIds([track]);
    addSnack({ severity: 'info', content: 'Search filters updated' });
    closeMore();
  };

  return (
    <>
      <MenuItem onClick={handleAddToPlaylist}>Add to playlist</MenuItem>
      <MenuItem
        onClick={handleShare({
          rootPath: '',
          closeMore,
          addSnack,
          params: JSON.stringify(urlSearchParams(searchbarState)),
        })}
      >
        Share Search
      </MenuItem>
      <MenuItem
        onClick={handleShare({
          closeMore,
          addSnack,
          params: JSON.stringify(urlTrackParams([track])),
        })}
      >
        Share Song
      </MenuItem>
      <MenuItem onClick={handleSearchSimilar}>Search similar</MenuItem>
      <MenuItem onClick={() => setSortOpen(true)}>Sort results...</MenuItem>
      <MenuItem onClick={closeMore}>Close</MenuItem>
      <Slide unmountOnExit mountOnEnter in={!!sortOpen} direction="up">
        <div className="absolute top-0 bg-white w-full">
          <SortPanel />
        </div>
      </Slide>
    </>
  );
};

export default ResultsMenu;
