import React from 'react';
import styled from 'styled-components';

import { Loader } from './ResultsTable/ResultsTableBody/overlayRenderer/styled';

interface Props {
  total?: number;
}

const TrackTotal = ({ total }: Props) =>
  total === undefined ? (
    <Loader color="grey" />
  ) : (
    <NumberContainer>
      {total.toLocaleString()}
      <span>Results</span>
    </NumberContainer>
  );

const NumberContainer = styled.div`
  display: flex;
  flex-flow: column;
  font-size: 14px;
`;
export default TrackTotal;
