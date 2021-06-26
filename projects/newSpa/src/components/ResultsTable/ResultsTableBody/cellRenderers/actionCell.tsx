import {
  CancelOutlined,
  FormatListBulletedOutlined,
  SearchOutlined,
} from '@material-ui/icons';
import React, { MouseEvent } from 'react';
import { useHistory, useParams } from 'react-router';

import { SimpleTrack } from '../../../../../generated/graphql';
import reactiveSearchbarState from '../../../Searchbar/searchbar.state';
import { SearchbarState } from '../../../Searchbar/types';
import { searchStateFromTrack } from '../util';
import { StyledFakeButton } from './styles';
import { CellProps, SongRenderer } from './types';

interface RouterTracklistHook {
  tracks: Array<number>;
  addTrack: (id: number) => void;
  removeTrack: (id: number) => void;
  // moveTrack: (id: number, newIndex: number) => void;
}

export const useRouterTrackList = (fallbackRoute: string): RouterTracklistHook => {
  const history = useHistory();
  const params = useParams<{ trackList?: string }>();

  let tracks: Array<number> = [];
  try {
    tracks = params.trackList?.split(',').map((num) => parseInt(num, 10)) ?? [];
    // console.log('split', params.trackList?.split(','))
  } catch (_: unknown) {
    console.error('route error, falling back to', fallbackRoute);
    history.push(fallbackRoute);
  }

  const updateRouteParam = (newParam: string) => {
    history.push(`/player/${newParam}`);
  };

  const addTrack = (newId: number) => {
    const stringId = newId.toString();
    const newList = params.trackList?.concat(',', stringId) ?? stringId;
    updateRouteParam(newList);
  };

  const removeTrack = (id: number) => {
      const newList = tracks.filter(listId => listId !== id).join(',');
      updateRouteParam(newList);
  };

  return {
    addTrack,
    tracks,
    removeTrack,
    // removeIndex <-- FixME
  };
};

export const ActionCell: SongRenderer = ({ song }: CellProps) => {
  const { addTrack, removeTrack, tracks } = useRouterTrackList('/player');
  console.log(tracks);

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
  const handleClick = ({ metaKey }: MouseEvent) => {
    const newState: SearchbarState = metaKey
      ? {
          search: song.title,
          sort: {},
          orchestra: null,
          singer: null,
          genre: null,
        }
      : searchStateFromTrack(song);
    reactiveSearchbarState(newState);
  };

  return (
    <StyledFakeButton>
      <SearchOutlined onClick={handleClick} />
    </StyledFakeButton>
  );
};
