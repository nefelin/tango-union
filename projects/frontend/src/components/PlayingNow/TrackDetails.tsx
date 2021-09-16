import { Paper } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';

import {
  SimpleTrack,
  useTrackDetailsBatchQuery,
} from '../../../generated/graphql';
import { Maybe } from '../../types/utility/maybe';
import { flagMissing } from './scoring/scoring';
import { goodScoreThreshold, maxScore } from './scoring/types';

const TrackDetails = ({ track }: { track: Maybe<SimpleTrack> }) => {
  const { data } = useTrackDetailsBatchQuery({
    variables: { ids: [track?.id ?? ''] }, // empty string should never happen due to skip, will error
    skip: track === null,
  });

  const { description = '', title = '' } = data?.tracksByIds[0]?.link ?? {};
  const linkScore = data?.tracksByIds[0]?.linkScore;

  const found = flagMissing([description, title], track);

  const scoreJudgement =
    linkScore && (linkScore / maxScore > goodScoreThreshold ? 'good' : 'bad');

  return (
    <TrackDetailsContainer>
      <TrackScoreLabel>
        Match Score:{' '}
        {scoreJudgement && (
          <TrackScoreDatum
            rating={scoreJudgement}
          >{`${linkScore}/${maxScore}`}</TrackScoreDatum>
        )}
      </TrackScoreLabel>
      <TrackDatumLabel>
        Title
        <FoundFlag found={found.title} />
      </TrackDatumLabel>
      <TrackDatum>{track?.title}</TrackDatum>
      <TrackDatumLabel>
        Orchestra
        <FoundFlag found={found.orchestra} />
      </TrackDatumLabel>
      <TrackDatum>{track?.orchestra?.join(', ')}</TrackDatum>
      <TrackDatumLabel>
        Singer
        <FoundFlag found={found.singer} severity={track?.singer?.includes('Instrumental') ? 'warn': 'error'} />
      </TrackDatumLabel>
      <TrackDatum>{track?.singer?.join(', ')}</TrackDatum>
      <TrackDatumLabel>
        Year
        <FoundFlag found={found.year} severity="warn" />
      </TrackDatumLabel>
      <TrackDatum>{track?.year}</TrackDatum>
    </TrackDetailsContainer>
  );
};

const FoundFlag = ({
  found,
  severity,
}: {
  found?: Maybe<boolean>;
  severity?: 'warn' | 'error';
}) => {
  if (found === undefined) {
    return null;
  }

  const severityDefault = found === null ? 'warn' : 'error';
  const severityWithDefault = severity || severityDefault;
  const negativeColor = severityWithDefault === 'error' ? 'red' : '#e8a102';

  return (
    <div
      style={{
        color: found ? 'green' : negativeColor,
        fontWeight: found ? 'inherit' : 'bold',
        marginLeft: 5,
      }}
    >
      {found ? 'found' : 'missing'}
    </div>
  );
};

export const TrackDetailsContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 10px;
  box-sizing: border-box;
  padding: 10px;
  transition: height 1s;
  min-height: 150px;
`;

const TrackDatumLabel = styled.div`
  display: flex;
  font-size: 10px;
  font-weight: bold;
`;

export const TrackScoreLabel = styled.div`
  font-size: 14px;
  margin-bottom: 12px;
`;

export const TrackScoreDatum = styled.span<{ rating: 'good' | 'bad' }>`
  font-size: 14px;
  font-weight: bold;
  color: ${({ rating }) => (rating === 'good' ? 'green' : 'red')};
`;

const TrackDatum = styled.div`
  margin-bottom: 8px;
  font-size: 12px;
`;

export default TrackDetails;
