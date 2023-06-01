import * as React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import CloudLogo from '../../assets/CloudLogo';
import { useWhoAmIQuery } from '../../generated/graphql';

interface Props {
  height?: string;
  fixed?: boolean;
}

const TopBar = ({ height = '55px', fixed = false }: Props) => {
  const navigate = useNavigate();
  const {data, loading} = useWhoAmIQuery();

  return (
    <TopBarContainer
      style={{ height, position: fixed ? 'fixed' : 'inherit' }}
    >
      <LogoContainer onClick={() => navigate('/')}>
        <CloudLogo size="40px" />
        <TitleSpan>Tango Union</TitleSpan>
      </LogoContainer>
      {data && <div className="flex bold text-white">Hi {data.whoAmI.firstName}</div>}
    </TopBarContainer>
  );
};

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
  width: 100%;
  display: flex;
  padding: 0 20px;
  background-color: #0606b9;
  align-items: center;
  justify-content: space-between;
  top: 0;
  z-index: 100;
`;

export default TopBar;
