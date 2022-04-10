import {
  DeleteOutline,
  DeleteOutlined,
  DeleteSweepOutlined,
  ExpandMore,
  ManageSearch,
  ReplyAllOutlined,
  ReplyOutlined, VolunteerActivismOutlined,
} from '@mui/icons-material';
import { MenuItem } from '@mui/material';
import React from 'react';

import { reactiveMoreState } from '../../features/MobileDash/reactiveMoreState';
import { QUICKLIST_PLAYLIST_ID } from '../../hooks/state/useGlobalPlaylistState/songLists.state';
import { usePlaylistState } from '../../hooks/state/usePlaylistState';
import { useSearchbarState } from '../../hooks/state/useSearchbarState';
import useSnackbars from '../../hooks/useSnackbars';
import { CompactTrack } from '../../types/compactTrack/types';
import { urlTrackParams } from '../../util/urlParams';
import IconSpacer from './IconSpacer';
import {
  composeSharePlaylistParams,
  composeShareSongParams,
  handleSearchSimilar,
  handleShare,
} from './sharedHandlers';
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
      <MenuItem onClick={closeMore}>
        <ExpandMore />
      </MenuItem>
      <MenuItem onClick={handleClearPlaylist}>
        <IconSpacer>
          <DeleteOutlined />
        </IconSpacer>
        Clear playlist
      </MenuItem>
      <MenuItem onClick={handleRemoveTrack}>
        <IconSpacer>
          <DeleteSweepOutlined />
        </IconSpacer>
        Remove from playlist
      </MenuItem>
      <MenuItem
        onClick={handleShare({
          params: composeSharePlaylistParams(playlist.tracks),
          closeMore,
          addSnack,
        })}
      >
        <IconSpacer>
          <ReplyAllOutlined />
        </IconSpacer>
        Share playlist
      </MenuItem>
      <MenuItem
        onClick={handleShare({
          params: composeSharePlaylistParams(playlist.tracks),
          rootPath: 'playlist/',
          closeMore,
          addSnack,
        })}
      >
        <IconSpacer>
          <VolunteerActivismOutlined />
        </IconSpacer>
        Share standalone playlist
      </MenuItem>
      <MenuItem
        onClick={handleShare({
          params: composeShareSongParams(track),
          closeMore,
          addSnack,
        })}
      >
        <IconSpacer>
          <ReplyOutlined />
        </IconSpacer>
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
        <IconSpacer>
          <ManageSearch />
        </IconSpacer>
        Search similar
      </MenuItem>
    </>
  );
};

export default PlaylistMenu;
