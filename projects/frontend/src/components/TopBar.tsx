import * as React from 'react';
import styled from 'styled-components';

import CloudLogo from '../../assets/CloudLogo';

const TopBar = () => (
  <TopBarContainer>
    <LogoContainer>
      <CloudLogo size="40px" />
      <TitleSpan>Tango Union</TitleSpan>
    </LogoContainer>
  </TopBarContainer>
);

const TitleSpan = styled.span`
  @import url('https://fonts.googleapis.com/css2?family=Encode+Sans+SC:wght@500&display=swap');
  color: white;
  font-size: 20px;
  margin-left: 20px;
  font-family: 'Encode Sans SC', sans-serif;
`;

const LogoContainer = styled.div`
  position: relative;
  left: 0;
  display: flex;
  align-items: center;
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
