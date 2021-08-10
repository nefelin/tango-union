import { HTMLAttributes } from 'react';
import styled from 'styled-components';

import { SelectionStatus } from '../hooks/state/useSelectionState';
import { TrackStatus } from '../hooks/state/useYoutubePlayerState/types';

const activeColor = 'rgb(240, 240, 240)';
const playingColor = 'rgb(230, 230, 230)';
const activeSelectedColor = 'white';
const activeSelectedBgColor = 'blue';

const passiveSelectedColor = 'black';
const passiveSelectedBgColor = '#d7d7ef';

const bgColorFromSelectionStatus = (status: SelectionStatus) => {
  switch (status) {
    case 'focused':
      return activeSelectedBgColor;
    case 'selected':
      return passiveSelectedBgColor;
    default:
      return 'inherit';
  }
};

const fgColorFromSelectionStatus = (status: SelectionStatus) => {
  switch (status) {
    case 'focused':
      return activeSelectedColor;
    case 'selected':
      return passiveSelectedColor;
    default:
      return 'inherit';
  }
};

interface Props {
  status: TrackStatus;
  selectionStatus: SelectionStatus;
}

type FullProps = Props & HTMLAttributes<HTMLDivElement>;

const PlayableRow = styled.div<FullProps>`
  user-select: none;
  display: flex;
  background-color: ${({ selectionStatus }) =>
    bgColorFromSelectionStatus(selectionStatus)};
  color: ${({ selectionStatus }) =>
    fgColorFromSelectionStatus(selectionStatus)};
  ${({ selectionStatus }) =>
    selectionStatus
      ? `border: 1px solid ${bgColorFromSelectionStatus(selectionStatus)};`
      : ''}
  height: 100%;
  width: 100%;
`;

export default PlayableRow;
