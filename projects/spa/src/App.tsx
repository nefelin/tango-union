import React from 'react';
import styled from 'styled-components';
import { SearchDash } from './components/SearchDash/SearchDash';
import { StateProvider } from './context/reducer';

function App() {
  return (
    <StateProvider>
      <div className="App">
        <StyledHeader>
          <img alt="Tango Union Logo" height={45} src={'./TangoUnionTemp.png'} />
        </StyledHeader>
        <SearchDash />
      </div>
    </StateProvider>
  );
}

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
  margin-bottom: 20px;
  padding: 10px;
`;

export default App;
