import React from 'react';
import styled from 'styled-components';

import { useDroppable } from '../DragNDrop/hooks/useDroppable';

export const NEW_PLAYLIST_ID = 'newPlaylistDroppable'
const EmptyPlaylist = () => {
  const {listeners, isOver} = useDroppable(NEW_PLAYLIST_ID);

  return <EmptyPlaylistStyled isOver={isOver} {...listeners}>Drag Songs Here</EmptyPlaylistStyled>;
};

const EmptyPlaylistStyled = styled.div<{isOver: boolean}>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: grey;
  background-color:  ${({ isOver }) => isOver ? '#d7d7ef' : 'inherit'};
`;
export default EmptyPlaylist;
