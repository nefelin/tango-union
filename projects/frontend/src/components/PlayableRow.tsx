import { HTMLAttributes } from 'react';
import styled from 'styled-components';

import { TrackStatus } from '../hooks/state/useYoutubePlayerState/types';

const activeColor = 'rgb(240, 240, 240)';
const playingColor = 'rgb(230, 230, 230)';
const selectedColor = 'white';
const selectedBgColor = 'blue';

interface Props {
  status: TrackStatus;
  selected: boolean;
}

type FullProps = Props & HTMLAttributes<HTMLDivElement>;

const PlayableRow = styled.div<FullProps>`
  user-select: none;
  display: flex;
  background-color: ${({ selected }) =>
    selected ? selectedBgColor : 'inherit'}; // fixme theme colors
  color: ${({ selected }) =>
    selected ? selectedColor : 'inherit'}; // fixme theme colors
  ${({ selected }) => (selected ? `border: 1px solid ${selectedBgColor};` : '')}
  height: 100%;
  width: 100%;
`;

export default PlayableRow;
