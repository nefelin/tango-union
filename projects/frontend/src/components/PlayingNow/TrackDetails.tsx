import { Paper } from '@material-ui/core';
import * as r from 'ramda';
import * as React from 'react';
import styled from 'styled-components';

import { SimpleTrack, useTrackLinksQuery } from '../../../generated/graphql';
import { Maybe } from '../../types';
import { cleanSlop } from '../../util/cleanSlop';

const flagFields = ['title', 'orchestra', 'singer', 'year', 'genre'] as const;
type FlagKeys = typeof flagFields[number];
type TrackFlags = Partial<Record<FlagKeys, boolean>>;
type FlagWeights = Record<FlagKeys, number>;

const flagWeights: FlagWeights = {
  title: 4,
  orchestra: 3,
  singer: 2,
  year: 1,
  genre: 0,
};
const maxScore = Object.values<number>(flagWeights).reduce(
  (prev, curr) => prev + curr,
  0,
);

const goodScoreThreshold = 0.6;

const scoreTrackMatch = (flags: TrackFlags): number => {
  const scored = r.mapObjIndexed(
    (flag, key) => (flags[key] ? flagWeights[key] : 0),
    flagWeights,
  );
  return Object.values<number>(scored).reduce((prev, curr) => prev + curr, 0);
};

const flagMissing = (
  texts: Array<string>,
  track: Maybe<SimpleTrack>,
): TrackFlags => {
  const corpus = cleanSlop(texts.join(' '));

  const ensureString = (val: string | number | Array<string>) => {
    if (Array.isArray(val)) {
      return val.join(' ');
    }
    if (typeof val === 'number') {
      return val.toString();
    }
    return val;
  };

  const basicCheck: TrackFlags = r.mapObjIndexed(
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    (val) => corpus.includes(cleanSlop(ensureString(val as any))),
    r.pick(flagFields, track || {}),
  );

  const dualTitle = track?.title.split('|').map(cleanSlop) ?? [];
  const titleFound =
    track?.title && dualTitle.length > 1
      ? r.any((title) => corpus.includes(title), dualTitle)
      : basicCheck['title'];

  return { ...basicCheck, title: titleFound };
};

const TrackDetails = ({ track }: { track: Maybe<SimpleTrack> }) => {
  const { data } = useTrackLinksQuery({
    variables: { ids: [track?.id ?? 0] },
    skip: track?.id === null,
  });

  const { description = '', title = '' } = data?.linksForTracks[0] ?? {};

  const found = flagMissing([description, title], track);
  const trackScore = scoreTrackMatch(found);

  const scoreJudgement =
    trackScore / maxScore > goodScoreThreshold ? 'good' : 'bad';

  return (
    <TrackDetailsContainer>
      <TrackScoreLabel>
        Match score:{' '}
        {track && (
          <TrackScoreDatum
            rating={scoreJudgement}
          >{`${trackScore}/${maxScore}`}</TrackScoreDatum>
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
        <FoundFlag found={found.singer} />
      </TrackDatumLabel>
      <TrackDatum>{track?.singer?.join(', ')}</TrackDatum>
      <TrackDatumLabel>
        Year
        <FoundFlag found={found.year} />
      </TrackDatumLabel>
      <TrackDatum>{track?.year}</TrackDatum>
      <TrackDatumLabel>
        Genre
        <FoundFlag found={found.genre} severity='warn' />
      </TrackDatumLabel>
      <TrackDatum>{track?.genre}</TrackDatum>
    </TrackDetailsContainer>
  );
};

const FoundFlag = ({
  found,
  severity = 'error',
}: {
  found?: boolean;
  severity?: 'warn' | 'error';
}) => {
  if (found === undefined) {
    return null;
  }

  const negativeColor = severity === 'error' ? 'red' : '#e8a102';
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
