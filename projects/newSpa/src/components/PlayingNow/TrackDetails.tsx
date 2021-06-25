import { Paper } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';

import type { SimpleTrack } from '../../../generated/graphql';
import type { Maybe } from '../../types';
import { WIDGET_WIDTH } from '../YoutubePlayer/util';

const TrackDetails = ({ track }: { track: Maybe<SimpleTrack> }) => {
  if (!track) {
    return null;
  }

  return (
    <TrackDetailsContainer>
      <TrackDatum>
        <TrackDatumLabel>Title: </TrackDatumLabel>
        {track.title}
      </TrackDatum>
      <TrackDatum>
        <TrackDatumLabel>Orchestra: </TrackDatumLabel>
        {track.orchestra}
      </TrackDatum>
      <TrackDatum>
        <TrackDatumLabel>Singer: </TrackDatumLabel>
        {track.singer}
      </TrackDatum>
      <TrackDatum>
        <TrackDatumLabel>Year: </TrackDatumLabel>
        {track.year}
      </TrackDatum>
      <TrackDatum>
        <TrackDatumLabel>Genre: </TrackDatumLabel>
        {track.genre}
      </TrackDatum>
    </TrackDetailsContainer>
  );
};

export const TrackDetailsContainer = styled(Paper)`
  box-sizing: border-box;
  padding: 10px;
  width: ${WIDGET_WIDTH};
`;

const TrackDatumLabel = styled.span`
  font-weight: bold;
`;

const TrackDatum = styled.div`
  margin-right: 4px;
`;

export default TrackDetails;
