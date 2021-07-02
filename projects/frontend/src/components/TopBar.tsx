import * as React from 'react';
import styled from 'styled-components';

import Logo from './TopBar/Logo';

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
  position: relative;
  padding: 13px 20px;
  margin-bottom: 20px;
  background-color: #a72d2d;
  top: 0;
  left: 0;
  right: 0;
`;

export default TopBar;
