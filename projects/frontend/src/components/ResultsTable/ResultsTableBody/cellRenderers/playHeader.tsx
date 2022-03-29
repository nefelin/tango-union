import { useReactiveVar } from '@apollo/client';
import { HelpOutline, PlayCircleFilledWhiteOutlined } from '@mui/icons-material';
import * as React from 'react';
import { useContext } from 'react';
import BaseTable, { ColumnShape } from 'react-base-table';

import { SimpleTrack } from '../../../../../generated/graphql';
import { PlaylistConfigContext } from '../../../../context/playlistConfig.context';
import { useGlobalPlaylistsState } from '../../../../hooks/state/useGlobalPlaylistState';
import { reactiveTableRowsVisible } from '../../resultsTable.state';
import { StyledFakeButton } from './styles';

const playHeaderRenderer: ColumnShape<SimpleTrack>['headerRenderer'] = ({
  container,
}) => <PlayHeader container={container} />;

const PlayHeader = ({ container }: { container: BaseTable<SimpleTrack> }) => {
  const {
    context: { trackIndex, playlistId },
  } = useGlobalPlaylistsState();
  const { name: playlistName } = useContext(PlaylistConfigContext);
  const [firstRow, lastRow] = useReactiveVar(reactiveTableRowsVisible);

  const index = playlistId === playlistName ? trackIndex : undefined;
  const activeTrackNotVisible =
    index !== undefined && (index < firstRow || index > lastRow);

  return activeTrackNotVisible ? (
    <StyledFakeButton onClick={() => container.scrollToRow(index)}>
      <HelpOutline />
    </StyledFakeButton>
  ) : (
    <PlayCircleFilledWhiteOutlined />
  );
};

export default playHeaderRenderer;
