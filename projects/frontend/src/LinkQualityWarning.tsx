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
      Poor link rating of <strong>({linkScore})</strong> indicates this might
      not be the song you&apos;re looking for
    </Alert>
  ) : null;
};

export default LinkQualityWarning;
