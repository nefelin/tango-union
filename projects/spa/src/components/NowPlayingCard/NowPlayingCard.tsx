import * as React from 'react';
import styled from 'styled-components';

import { YoutubePlayer } from '../YoutubePlayer/YoutubePlayer';

export const NowPlayingCard = () => {
  // const { nowPlaying } = useContext(store);
  //
  return (
    <StyledCardWrapper>
      <YoutubePlayer />
      {/*<StyledMetaCol>*/}
      {/*  <strong>Video Title:</strong>*/}
      {/*  {nowPlaying?.youtubeMeta.title}*/}
      {/*  <strong>Video Description:</strong>*/}
      {/*  {nowPlaying?.youtubeMeta.description}*/}
      {/*  <strong>Song Title</strong>*/}
      {/*  {nowPlaying?.libMeta.title}*/}
      {/*  <strong>Song Orchestra</strong>*/}
      {/*  {nowPlaying?.libMeta.orchestra}*/}
      {/*  <strong>Song Singer</strong>*/}
      {/*  {nowPlaying?.libMeta.singer}*/}
      {/*  <strong>Song Year</strong>*/}
      {/*  {nowPlaying?.libMeta.year}*/}
      {/*</StyledMetaCol>*/}
    </StyledCardWrapper>
  );
};

const StyledCardWrapper = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: row;
  padding: 20px;
  border: 1px solid black;
  text-align: left;
`;

const StyledMetaCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledMetaRow = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
`;
const NothingPlaying = () => <StyledCardWrapper>Nothing Playing</StyledCardWrapper>;
