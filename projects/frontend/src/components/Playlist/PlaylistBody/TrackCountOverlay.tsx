import { DragOverlay } from '@dnd-kit/core';
import { snapCenterToCursor } from '@dnd-kit/modifiers';
import * as React from 'react';
import styled from 'styled-components';

import { defaultDropAnimation } from '../PlaylistBody';

interface Props {
  dragging: boolean;
  count: number;
}

const TrackCountOverlay = ({ dragging, count }: Props) => (
  <DragOverlay
    modifiers={[snapCenterToCursor]}
    dropAnimation={defaultDropAnimation}
  >
    {dragging ? (
      <CenteringDiv>
        <DraggerCount>{count}</DraggerCount>
      </CenteringDiv>
    ) : null}
  </DragOverlay>
);

const CenteringDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

const DraggerCount = styled.div`
  width: 20px;
  height: 20px;
  font-weight: bold;
  font-size: 12px;
  background-color: red;
  color: white;
  padding: 10px 0;
  border-radius: 10px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  display: flex;
`;

export default TrackCountOverlay;