import { FormatListBulletedOutlined, SearchOutlined } from '@material-ui/icons';
import React, { MouseEvent } from 'react';

import { SimpleTrack } from '../../../../../generated/graphql';
import reactiveSearchbarState from '../../../Searchbar/searchbar.state';
import { SearchbarState } from '../../../Searchbar/types';
import { searchStateFromTrack } from '../util';
import { StyledFakeButton } from './styles';
import { CellProps, SongRenderer } from './types';

export const ActionCell: SongRenderer = ({ song }: CellProps) => {
  return (
    <>
      <SearchButton song={song} />
      <StyledFakeButton>
        <FormatListBulletedOutlined
          onClick={() => alert('should somehow let us pick a source')}
        />
      </StyledFakeButton>
    </>
  );
};

const SearchButton = ({ song }: { song: SimpleTrack }) => {
  const handleClick = ({ metaKey }: MouseEvent) => {
    const newState: SearchbarState = metaKey
      ? { search: song.title, sort: {}, orchestra: null, singer: null, genre: null }
      : searchStateFromTrack(song);
    reactiveSearchbarState(newState);
  };

  return (
    <StyledFakeButton>
      <SearchOutlined onClick={handleClick} />
    </StyledFakeButton>
  );
};
