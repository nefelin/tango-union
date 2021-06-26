import { Paper } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';

import type { SimpleTrack } from '../../../generated/graphql';
import type { Maybe } from '../../types';
import { WIDGET_WIDTH } from '../YoutubePlayer/util';

const TrackDetails = ({ track }: { track: Maybe<SimpleTrack> }) => {
  return (
    <TrackDetailsContainer>
        <TrackDatumLabel>Title</TrackDatumLabel>
      <TrackDatum>
        {track?.title}
      </TrackDatum>
        <TrackDatumLabel>Orchestra</TrackDatumLabel>
      <TrackDatum>
        {track?.orchestra}
      </TrackDatum>
        <TrackDatumLabel>Singer</TrackDatumLabel>
      <TrackDatum>
        {track?.singer}
      </TrackDatum>
        <TrackDatumLabel>Year</TrackDatumLabel>
      <TrackDatum>
        {track?.year}
      </TrackDatum>
        <TrackDatumLabel>Genre</TrackDatumLabel>
      <TrackDatum>
        {track?.genre}
      </TrackDatum>
    </TrackDetailsContainer>
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

const TrackDatumLabel = styled.span`
  font-size: 10px;
  font-weight: bold;
`;

const TrackDatum = styled.div`
  margin-bottom: 8px;
  font-size:12px;
`;

export default TrackDetails;
