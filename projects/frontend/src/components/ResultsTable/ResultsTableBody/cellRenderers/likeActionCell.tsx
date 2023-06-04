import { Favorite, FavoriteBorder } from '@mui/icons-material';
import React, { MouseEvent } from 'react';

import {
  useLikeTrackMutation,
  useUnlikeTrackMutation,
  WhoAmIDocument,
} from '../../../../../generated/graphql';
import useWhoAmiI from '../../../../hooks/useWhoAmiI';
import { CellProps } from './types';

export const LikeActionCell = ({ song }: CellProps) => {
  const user = useWhoAmiI();

  // todo handle errors
  const [likeTrack] = useLikeTrackMutation({
    refetchQueries: [WhoAmIDocument],
  });
  const [unlikeTrack] = useUnlikeTrackMutation({
    refetchQueries: [WhoAmIDocument],
  });
  const liked = (user?.likedTracks ?? []).includes(parseInt(song.trackId));

  const handleToggleLike = (e: MouseEvent) => {
    const trackId = parseInt(song.trackId);
    if (liked) {
      unlikeTrack({ variables: { trackId } });
    } else {
      likeTrack({ variables: { trackId } });
    }
  };

  return (
      <button className="text-md p-1" onClick={handleToggleLike} onMouseDown={e =>e.stopPropagation()}>
        {liked ? (
          <Favorite fontSize="inherit" sx={{ color: 'red' }} />
        ) : (
          <FavoriteBorder
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            fontSize="inherit"
          />
        )}
      </button>
  );
};

const classes = (
  ...classNames: Array<null | undefined | false | string>
): string => classNames.filter((str) => !!str).join(' ');
