import { useReactiveVar } from '@apollo/client';
import { HelpOutline, PlayCircleFilledWhiteOutlined } from '@material-ui/icons';
import * as React from 'react';
import BaseTable, { ColumnShape } from 'react-base-table';

import { SimpleTrack } from '../../../../../generated/graphql';
import {
  reactiveTableRowsVisible,
  useResultsPlayingContext,
} from '../../resultsTable.state';
import { StyledFakeButton } from './styles';

const playHeaderRenderer: ColumnShape<SimpleTrack>['headerRenderer'] = ({
  container,
}) => <PlayHeader container={container} />;

const PlayHeader = ({ container }: { container: BaseTable<SimpleTrack> }) => {
  const { index } = useResultsPlayingContext();
  const [firstRow, lastRow] = useReactiveVar(reactiveTableRowsVisible);

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
