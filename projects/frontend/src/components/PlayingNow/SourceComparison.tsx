import React, { useState } from 'react';

import { useYoutubePlayerState } from '../../hooks/state/useYoutubePlayerState';
import useCacheStitchedIdFetch from '../ResultsTable/useCacheStitchedIdFetch';
import { flagMissing } from './scoring/scoring';
import { goodScoreThreshold, maxScore } from './scoring/types';
import UnionSourceCard from './UnionSourceCard';
import YoutubeSourceCard from './YoutubeSourceCard';

const SourceComparison = () => {
  const { currentTrack: compact } = useYoutubePlayerState();
  const [hydrated] = useCacheStitchedIdFetch([compact]);

  const currentTrack = hydrated?.[0] || null;
  if (!currentTrack || !currentTrack.link || !currentTrack.linkScore) {
    return null;
  }

  const { linkScore } = currentTrack;
  const { description = '', title = '' } = currentTrack.link ?? {};

  const foundMap = flagMissing([description, title], currentTrack);
  const missing = Object.keys(foundMap).filter(
    (key) => foundMap[key] === false,
  );

  const scoreJudgement =
    linkScore / maxScore > goodScoreThreshold ? 'good' : 'bad';

  return (
    <div
      style={{
        // padding: 20,
        margin: '0 0px 0 10px',
        gap: 10,
        display: 'flex',
        flexFlow: 'column',
        width: '100%',
        height: 200,
      }}
    >
      <UnionSourceCard track={currentTrack} />
      <YoutubeSourceCard
        missingFields={missing}
        ratingJudgement={scoreJudgement}
        rating={`${linkScore}/${maxScore}`}
        title={currentTrack?.link?.title}
        description={currentTrack.link.description}
      />
    </div>
  );
};

export default SourceComparison;
