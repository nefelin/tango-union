import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useSearchbarState } from '../../hooks/state/useSearchbarState';

const QueryPlan = ({ plan }: { plan: string }) => {
  const { setSearchbarState, searchbarState } = useSearchbarState();
  const [contents, setContents] = useState(plan); // fixme write usedSyncedState hook
  useEffect(() => setContents(plan), [plan]);

  const clearYears = () =>
    setSearchbarState({ ...searchbarState, year: undefined });
  return (
    <PlanContainer
      onMouseLeave={() => setContents(plan)}
      onMouseEnter={() => setContents('Clear Years')}
      onClick={() => clearYears()}
    >
      {contents}
    </PlanContainer>
  );
};

const PlanContainer = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 1px 1px 2px grey;
  padding: 3px;
  font-size: 12px;
  background-color: white;
`;
export default QueryPlan;
