import { HTMLAttributes } from 'react';
import styled from 'styled-components';

import { TrackStatus } from './YoutubePlayer/youtubePlayer.state';

const activeColor = 'rgb(240, 240, 240)';
const playingColor = 'rgb(230, 230, 230)';

interface Props {
  status: TrackStatus;
}

type FullProps = Props & HTMLAttributes<HTMLDivElement>;

const PlayableRow = styled.div<FullProps>`
  display: flex;
  background-color: ${({ status: { active } }) =>
    active ? activeColor : 'inherit'}; // fixme theme colors
  height: 100%;
  width: 100%;
  transition: background-color
    ${({ status: { active } }) => (active ? '1s' : '400ms')};
  ${({ status: { playing } }) =>
    playing
      ? `
    animation-name: color;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;`
      : ''}

  @keyframes color {
    0% {
      background-color: ${activeColor};
    }
    50% {
      background-color: ${playingColor};
    }
    100% {
      background-color: ${activeColor};
    }
  }
`;

export default PlayableRow;
