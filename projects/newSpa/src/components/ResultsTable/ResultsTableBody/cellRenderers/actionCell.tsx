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
  replaceTracks: (ids: Array<number>) => void;
  // moveTrack: (id: number, newIndex: number) => void;
}

export const useRouterTrackList = (
  fallbackRoute = '/player',
): RouterTracklistHook => {
  const history = useHistory();
  const params = useParams<{ trackList?: string }>();

  const tracks: Array<number> =
    params.trackList?.split(',').map((num) => parseInt(num, 10)).filter(x => !isNaN(x)) ?? [];

  const updateRouteParam = (newParam: string) => {
    history.replace(`/player/${newParam}`);
  };

  const addTrack = (newId: number) => {
    const stringId = newId.toString();
    const newList = params.trackList?.concat(',', stringId) ?? stringId;
    updateRouteParam(newList);
  };

  const removeTrack = (id: number) => {
    const newList = tracks.filter((listId) => listId !== id).join(',');
    updateRouteParam(newList);
  };

  const replaceTracks = (ids: Array<number>) => {
    updateRouteParam(ids.map((id) => id.toString()).join(','));
  };

  return {
    addTrack,
    tracks,
    removeTrack,
    // removeIndex <-- FixME
    replaceTracks,
  };
};

export const ActionCell: SongRenderer = ({ song }: CellProps) => {
  const { addTrack, removeTrack } = useRouterTrackList('/player');

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
