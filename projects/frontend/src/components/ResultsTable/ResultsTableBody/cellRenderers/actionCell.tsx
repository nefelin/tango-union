import {
  CancelOutlined,
  FormatListBulletedOutlined,
  SearchOutlined,
} from '@material-ui/icons';
import React, { MouseEvent } from 'react';

import { SimpleTrack } from '../../../../../generated/graphql';
import { useSearchbarState } from '../../../Searchbar/searchbar.state';
import { SearchbarState } from '../../../Searchbar/types';
import { searchStateFromTrack } from '../util';
import { StyledFakeButton } from './styles';
import { CellProps, SongRenderer } from './types';
import { useRoutedTrackList } from '../../../../hooks/useRoutedTracklist';

export const ActionCell: SongRenderer = ({ song }: CellProps) => {
  const { addTrack, removeTrack } = useRoutedTrackList();

  return (
    <>
      <SearchButton song={song} />
      <StyledFakeButton onClick={() => addTrack(song.id)}>
        <FormatListBulletedOutlined />
      </StyledFakeButton>
      <StyledFakeButton onClick={() => removeTrack(song.id)}>
        <CancelOutlined />
      </StyledFakeButton>
    </>
  );
};

const SearchButton = ({ song }: { song: SimpleTrack }) => {
  const { setSearchbarState } = useSearchbarState();
  const handleClick = ({ metaKey }: MouseEvent) => {
    const newState: SearchbarState = metaKey
      ? {
          text: song.title,
          orchestras: null,
          singers: null,
          genres: null,
        }
      : searchStateFromTrack(song);
    setSearchbarState(newState);
  };

  return (
    <StyledFakeButton>
      <SearchOutlined onClick={handleClick} />
    </StyledFakeButton>
  );
};
