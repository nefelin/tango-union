import { Alert, AlertColor } from '@mui/material';
import React from 'react';

import { TrackDetailFragmentFragment } from '../generated/graphql';

interface Props {
  track: TrackDetailFragmentFragment;
}

const RATING_THRESHOLD = 6;

const LinkQualityWarning = ({ track: { linkScore } }: Props) => {
  const show = linkScore <= RATING_THRESHOLD;
  const severity: AlertColor =
    linkScore === RATING_THRESHOLD ? 'warning' : 'error';

  return show ? (
    <Alert severity={severity}>
      It&apos;s likely this YouTube video doesn&apos;t match the song
      you&apos;re trying to play. The link linkScore on this video is{' '}
      <strong>{linkScore}</strong>. A link quality of 7 or greater is likely
      good, 6 is borderline, and 5 and below are likely not a match.
    </Alert>
  ) : null;
};

export default LinkQualityWarning;
