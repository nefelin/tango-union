import { SimpleCacheConfigurator } from '@babel/core';
import { Tooltip } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

import { SimpleTrack } from '../../../generated/graphql';

const YoutubeSourceCard = ({
  track: { title, orchestra, singer, year },
}: {
  track: SimpleTrack;
}) => (
  <CardContainer>
    <Header>
      <CardLabel>Now Playing</CardLabel>
      <SourceLabel>UNION RECORD</SourceLabel>
    </Header>
    <Body>
      <LabelColumn>
        <span>Title:</span>
        <span>Orchestra:</span>
      </LabelColumn>
      <DataColumn>
        <Tooltip title={title}>
          <FixedWidthContainer>{title}</FixedWidthContainer>
        </Tooltip>
        <span>{orchestra?.join(', ')}</span>
      </DataColumn>
      <LabelColumn>
        <span>Year:</span>
        <span>Singer:</span>
      </LabelColumn>
      <DataColumn>
        <span>{year}</span>
        <span>{singer?.join(', ')}</span>
      </DataColumn>
    </Body>
  </CardContainer>
);

const CardLabel = styled.div`
  font-style: italic;
  font-weight: bold;
  padding: 8px 12px;
`;

const Body = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: 8px 12px;
`;

const Header = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const LabelColumn = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
`;

const FixedWidthContainer = styled.span`
  width: 130px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DataColumn = styled.div`
  margin: 0 10px;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
`;

const CardContainer = styled.div`
  box-sizing: border-box;
  font-size: 12px;
  position: relative;
  display: flex;
  flex-flow: column;
  flex-wrap: nowrap;
  height: 100%;
  max-width: 100%;
  //padding: 8px 12px;
  //border: 1px solid #bdbdbd;
  box-shadow: 1px 1px 3px #959595;
`;

const SourceLabel = styled.div`
  justify-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #bdbdbd;
  border-bottom: 1px solid #bdbdbd;
  padding: 8px 12px;
  color: grey;
`;
export default YoutubeSourceCard;
