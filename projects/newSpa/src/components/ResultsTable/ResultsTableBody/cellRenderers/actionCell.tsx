import { FormatListBulletedOutlined, SearchOutlined } from '@material-ui/icons';
import React from 'react';

import reactiveSearchbarState from '../../../Searchbar/searchbar.state';
import { searchStateFromTrack } from '../util';
import { StyledFakeButton } from './styles';
import { CellProps, SongRenderer } from './types';

export const ActionCell: SongRenderer = ({ song }: CellProps) => {
  return (
    <StyledFakeButton>
      <SearchOutlined
        onClick={() =>
          reactiveSearchbarState({
            ...reactiveSearchbarState(),
            ...searchStateFromTrack(song),
          })
        }
      />
      <FormatListBulletedOutlined
        onClick={() => alert('should somehow let us pick a source')}
      />
    </StyledFakeButton>
  );
};
