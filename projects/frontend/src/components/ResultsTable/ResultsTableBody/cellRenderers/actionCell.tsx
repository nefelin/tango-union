import {
  FormatListBulletedOutlined,
} from '@mui/icons-material';
import React, { MouseEvent } from 'react';

import { QUICKLIST_PLAYLIST_ID } from '../../../../hooks/state/useGlobalPlaylistState/songLists.state';
import { usePlaylistState } from '../../../../hooks/state/usePlaylistState';
import { StyledFakeButton } from './styles';
import { CellProps, SongRenderer } from './types';

export const ActionCell: SongRenderer = ({ song }: CellProps) => {
  const { addTracks } = usePlaylistState(QUICKLIST_PLAYLIST_ID);

  return (
    <>
      <StyledFakeButton onClick={() => addTracks([song.id])}>
        <FormatListBulletedOutlined />
      </StyledFakeButton>
    </>
  );
};
