import {
  ExpandMore,
  Favorite,
  HeartBroken,
  ManageSearch,
  PlaylistAdd,
  ReplyAllOutlined,
  ReplyOutlined,
  Sort,
} from '@mui/icons-material';
import { MenuItem, Slide, Typography } from '@mui/material';
import React, { useState } from 'react';

import {
  useLikeTrackMutation,
  useUnlikeTrackMutation,
  WhoAmIDocument,
} from '../../../generated/graphql';
import { reactiveMoreState } from '../../features/MobileDash/reactiveMoreState';
import { QUICKLIST_PLAYLIST_ID } from '../../hooks/state/useGlobalPlaylistState/songLists.state';
import { usePlaylistState } from '../../hooks/state/usePlaylistState';
import { useSearchbarState } from '../../hooks/state/useSearchbarState';
import useSnackbars from '../../hooks/useSnackbars';
import useWhoAmiI from '../../hooks/useWhoAmiI';
import { CompactTrack } from '../../types/compactTrack/types';
import { urlSearchParams, urlTrackParams } from '../../util/urlParams';
import SortPanel from '../MobileSort/SortPanel';
import IconSpacer from './IconSpacer';
import { composeShareSongParams, handleShare } from './sharedHandlers';
const ResultsMenu = ({ track }: { track: CompactTrack }) => {
  const { addTracks } = usePlaylistState(QUICKLIST_PLAYLIST_ID);
  const { searchbarState, searchFromIds } = useSearchbarState();
  const { addSnack } = useSnackbars();
  const [sortOpen, setSortOpen] = useState(false);
  const user = useWhoAmiI();

  // todo handle errors
  const [likeTrack] = useLikeTrackMutation({
    refetchQueries: [WhoAmIDocument],
  });
  const [unlikeTrack] = useUnlikeTrackMutation({
    refetchQueries: [WhoAmIDocument],
  });
  const liked = (user?.likedTracks ?? []).includes(parseInt(track.trackId));

  const handleToggleLike = () => {
    const trackId = parseInt(track.trackId);
    if (liked) {
      unlikeTrack({ variables: { trackId } });
    } else {
      likeTrack({ variables: { trackId } });
    }
    closeMore()
  };

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
      <MenuItem onClick={closeMore}>
        <ExpandMore />
      </MenuItem>
      {user && (
        <MenuItem onClick={handleToggleLike}>
          <IconSpacer>{liked ? <HeartBroken /> : <Favorite />}</IconSpacer>
          {liked ? 'Unlike' : 'Like'} Song
        </MenuItem>
      )}
      <MenuItem onClick={handleAddToPlaylist}>
        <IconSpacer>
          <PlaylistAdd />
        </IconSpacer>
        Add to playlist
      </MenuItem>
      <MenuItem
        onClick={handleShare({
          rootPath: '',
          closeMore,
          addSnack,
          params: JSON.stringify(urlSearchParams(searchbarState)),
        })}
      >
        <IconSpacer>
          <ReplyAllOutlined />
        </IconSpacer>
        Share Search
      </MenuItem>
      <MenuItem
        onClick={handleShare({
          closeMore,
          addSnack,
          params: composeShareSongParams(track),
        })}
      >
        <IconSpacer>
          <ReplyOutlined />
        </IconSpacer>
        Share Song
      </MenuItem>
      <MenuItem onClick={handleSearchSimilar}>
        <IconSpacer>
          <ManageSearch />
        </IconSpacer>
        Search similar
      </MenuItem>
      <MenuItem onClick={() => setSortOpen(true)}>
        <IconSpacer>
          <Sort />
        </IconSpacer>
        Sort results...
      </MenuItem>
      <Slide unmountOnExit mountOnEnter in={!!sortOpen} direction="up">
        <div className="absolute top-0 bg-white w-full">
          <SortPanel />
        </div>
      </Slide>
    </>
  );
};

export default ResultsMenu;
