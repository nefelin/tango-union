import styled from 'styled-components';

const BaseTableStyleOverrides = styled.div<{ dragging?: boolean }>`
  .BaseTable__row:hover {
    background-color: ${({ dragging }) => (dragging ? 'inherit' : '#f3f3f3')};
  }
`;

export default BaseTableStyleOverrides;