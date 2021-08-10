import {
  FormatListBulletedOutlined,
} from '@material-ui/icons';
import React, { MouseEvent } from 'react';

import { usePlaylistState } from '../../../../hooks/state/usePlaylistState';
import { StyledFakeButton } from './styles';
import { CellProps, SongRenderer } from './types';

export const ActionCell: SongRenderer = ({ song }: CellProps) => {
  const { addTracks } = usePlaylistState('quicklist');

  return (
    <>
      <StyledFakeButton onClick={() => addTracks([song.id])}>
        <FormatListBulletedOutlined />
      </StyledFakeButton>
    </>
  );
};
