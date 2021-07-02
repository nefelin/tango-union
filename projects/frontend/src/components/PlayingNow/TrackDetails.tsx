import { Paper } from '@material-ui/core';
import * as r from 'ramda';
import * as React from 'react';
import styled from 'styled-components';
import { cleanSlop } from 'tango-index/dist/compoundIndex/util';

import { SimpleTrack, useTrackLinksQuery } from '../../../generated/graphql';
import { Maybe } from '../../types';
import { WIDGET_WIDTH } from '../YoutubePlayer/util';

const flagFields = ['title', 'orchestra', 'singer', 'year', 'genre'] as const;
type TrackFlags = Partial<Record<typeof flagFields[number], boolean>>;
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
    variables: { trackId: track?.id ?? 0 },
    skip: track?.id === null,
  });

  const { description = '', title = '' } = data?.trackSource[0] ?? {};

  const found = flagMissing([description, title], track);

  return (
    <TrackDetailsContainer>
      <TrackDatumLabel>
        Title
        <FoundFlag found={found.title} />
      </TrackDatumLabel>
      <TrackDatum>{track?.title}</TrackDatum>
      <TrackDatumLabel>
        Orchestra
        <FoundFlag found={found.orchestra} />
      </TrackDatumLabel>
      <TrackDatum>{track?.orchestra}</TrackDatum>
      <TrackDatumLabel>
        Singer
        <FoundFlag found={found.singer} />
      </TrackDatumLabel>
      <TrackDatum>{track?.singer}</TrackDatum>
      <TrackDatumLabel>
        Year
        <FoundFlag found={found.year} />
      </TrackDatumLabel>
      <TrackDatum>{track?.year}</TrackDatum>
      <TrackDatumLabel>
        Genre
        <FoundFlag found={found.genre} />
      </TrackDatumLabel>
      <TrackDatum>{track?.genre}</TrackDatum>
    </TrackDetailsContainer>
  );
};

const FoundFlag = ({ found }: { found?: boolean }) => {
  if (found === undefined) {
    return null;
  }
  return (
    <div
      style={{
        color: found ? 'green' : 'red',
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
`;

const TrackDatumLabel = styled.div`
  display: flex;
  font-size: 10px;
  font-weight: bold;
`;

const TrackDatum = styled.div`
  margin-bottom: 8px;
  font-size: 12px;
`;

export default TrackDetails;
