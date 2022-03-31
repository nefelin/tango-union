import * as React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import CloudLogo from '../../assets/CloudLogo';

const TopBar = () => {
  const navigate = useNavigate();
  return (
    <TopBarContainer>
      <LogoContainer onClick={() => navigate('/')}>
        <CloudLogo size="40px" />
        <TitleSpan>Tango Union</TitleSpan>
      </LogoContainer>
    </TopBarContainer>
  );
}

const TitleSpan = styled.span`
  color: white;
  font-size: 20px;
  margin-left: 20px;
  font-family: 'Encode Sans SC', sans-serif;
  font-weight: 700;
`;

const LogoContainer = styled.div`
  position: relative;
  left: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const TopBarContainer = styled.div`
  height: 55px;
  width: 100%;
  display: flex;
  padding-left: 20px;
  background-color: #0606b9;
  align-items: center;
`;

export default TopBar;
