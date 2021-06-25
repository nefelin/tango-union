import { FormatListBulletedOutlined, SearchOutlined } from '@material-ui/icons';
import React from 'react';

import { StyledFakeButton } from './styles';
import type { CellProps, SongRenderer } from './types';

export const ActionCell: SongRenderer = ({ song }: CellProps) => {
  return (
    <StyledFakeButton>
      <SearchOutlined
        onClick={() => alert('should copy some search criteria')}
      />
      <FormatListBulletedOutlined
        onClick={() => alert('should somehow let us pick a source')}
      />
    </StyledFakeButton>
  );
};
