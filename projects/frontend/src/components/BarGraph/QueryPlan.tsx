import React from 'react';
import styled from 'styled-components';

const QueryPlan = ({ plan }: { plan: string }) => (
  <PlanContainer>{plan}</PlanContainer>
);

const PlanContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 1px 1px 2px grey;
  padding: 3px;
  font-size: 12px;
  background-color: white;
`;
export default QueryPlan;
