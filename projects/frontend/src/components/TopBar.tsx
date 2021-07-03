import * as React from 'react';
import styled from 'styled-components';

const TopBar = () => (
  <TopBarContainer>
    <LogoContainer>TANGO UNION</LogoContainer>
  </TopBarContainer>
);

const LogoContainer = styled.div`
  position: relative;
  left: 0;
  font-size: 20px;
  color: white;
  font-family: 'Malayalam MN';
`;

const TopBarContainer = styled.div`
  height: 55px;
  width: 100%;
  display: flex;
  padding-left: 20px;
  margin-bottom: 20px;
  background-color: #0606b9;
  align-items: center;
`;

export default TopBar;
