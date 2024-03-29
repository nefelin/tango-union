import React from 'react';
import styled from 'styled-components';

import { useDroppable } from '../DragNDrop/hooks/useDroppable';

export const NEW_PLAYLIST_ID = 'newPlaylistDroppable';
const EmptyPlaylist = ({ size }: { size: 'large' | 'small' }) => {
  const { listeners, isOver } = useDroppable(NEW_PLAYLIST_ID);

  return (
    <EmptyPlaylistStyled size={size} isOver={isOver} {...listeners}>
      Drag Songs Here
    </EmptyPlaylistStyled>
  );
};

export const droppableBgColor = '#d7d7ef';

const EmptyPlaylistStyled = styled.div<{
  isOver: boolean;
  size: 'large' | 'small';
}>`
  transition: all 300ms ease-in-out;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ size }) => (size === 'large' ? '24px' : '14px')};
  color: grey;
  background-color: ${({ isOver }) => (isOver ? droppableBgColor : 'inherit')};
`;
export default EmptyPlaylist;
