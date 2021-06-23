import {
  FormatListBulletedOutlined,
  PlayCircleFilledWhiteOutlined,
  SearchOutlined,
} from '@material-ui/icons';
import type { FunctionComponent } from 'react';
import React from 'react';
import type { ColumnShape } from 'react-base-table';
import styled from 'styled-components';

import type { SimpleTrack } from '../../../generated/graphql';

interface SongProps {
  song: SimpleTrack;
}

type SongRenderer = FunctionComponent<SongProps>;

const ActionCell: SongRenderer = ({ song }: SongProps) => {
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
const cellRenderComponent: (
  Comp: SongRenderer,
) => ColumnShape<SimpleTrack>['cellRenderer'] =
  (Comp: SongRenderer) => (data) => {
    const { rowData } = data;
    return <Comp song={rowData} />;
  };

const columns: (s: any) => Array<ColumnShape> = (youtubeSearch: any) => [
  {
    key: 'title-play',
    dataKey: 'title',
    title: '',
    width: 50,
    cellRenderer: cellRenderComponent(PlayCell),
    sortable: false,
  },
  {
    key: 'title',
    dataKey: 'title',
    title: 'Title',
    width: 250,
    resizable: true,
    sortable: true,
  },
  {
    key: 'orchestra',
    dataKey: 'orchestra',
    title: 'Orchestra',
    width: 200,
    resizable: true,
    sortable: true,
  },
  {
    key: 'singer',
    dataKey: 'singer',
    title: 'Singer',
    width: 200,
    resizable: true,
    sortable: true,
  },
  {
    key: 'year',
    dataKey: 'year',
    title: 'Year',
    width: 100,
    resizable: true,
    sortable: true,
  },
  {
    key: 'genre',
    dataKey: 'genre',
    title: 'Genre',
    width: 100,
    resizable: true,
    sortable: true,
  },
  {
    key: 'length',
    dataKey: 'secondsLong',
    title: 'SecondsLong',
    width: 75,
    resizable: true,
    sortable: true,
  },
  {
    key: 'title-action',
    dataKey: 'title',
    title: '',
    width: 100,
    cellRenderer: cellRenderComponent(ActionCell),
    resizable: true,
    sortable: false,
  },
];

const StyledFakeButton = styled.div`
  cursor: pointer;
`;

const PlayCell = ({ song }: SongProps) => {
  // const { playing, nowPlayingId, dispatch } = useContext(store);
  //
  // const isPlaying = playing === 'playing' && nowPlayingId === song._id;
  //
  // const action: Action = isPlaying
  //   ? { type: 'pause' }
  //   : { type: 'playFromTrackId', id: song._id };

  const Icon = () => <PlayCircleFilledWhiteOutlined />;

  // const Icon = () =>
  //   isPlaying ? <PauseCircleOutline /> : <PlayCircleFilledWhiteOutlined />;

  return (
    <StyledFakeButton
      onClick={() => {
        console.log('asdf');
      }}
    >
      <Icon />
    </StyledFakeButton>
  );
};

export default columns;
