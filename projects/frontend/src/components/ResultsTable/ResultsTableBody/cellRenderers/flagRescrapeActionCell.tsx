import { EmojiFlags } from '@mui/icons-material';
import React, { MouseEvent } from 'react';

import {
  useFlagRescrapeMutation,
  useUnflagRescrapeMutation,
} from '../../../../../generated/graphql';
import { CellProps } from './types';

export const FlagRescrapeActionCell = ({ song }: CellProps) => {
  // todo handle errors
  const [flag] = useFlagRescrapeMutation({});
  const [unflag] = useUnflagRescrapeMutation({});

  const flagged = song.flaggedForRescrape;
  const handleToggleLike = async (_: MouseEvent) => {
    const trackId = song.trackId;
    if (flagged) {
      await unflag({
        variables: { trackId },
      });
    } else {
      await flag({
        variables: { trackId },
      });
    }
  };

  return (
    <button
      className="text-md p-1"
      onClick={handleToggleLike}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {flagged ? (
        <EmojiFlags fontSize="inherit" className="opacity-90" />
      ) : (
        <EmojiFlags
          className="opacity-0 group-hover:opacity-40 transition-opacity"
          fontSize="inherit"
        />
      )}
    </button>
  );
};
