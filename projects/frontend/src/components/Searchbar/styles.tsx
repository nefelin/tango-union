import InputLabel from '@material-ui/core/InputLabel';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const StyledCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-end;
  gap: 8px;
`;

export const StyledRow = styled.div`
  height: 38px;
  width: 100%;
  gap: 20px;
  display: flex;
  flex-direction: row;
`;

export const StyledCount = styled.div`
  color: grey;
  font-size: 10px;
`;

export const StyledMenuOption = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const SearchInputContainer = styled.div<{ focus: boolean }>`
  border: ${({ focus }) => (focus ? '2px solid #2684ff' : '1px solid #d0d0d0')};
  border-radius: 4px;
  margin-right: ${({ focus }) => (focus ? '-1px' : '0')};;
  display: flex;
  padding-left: ${({ focus }) => (focus ? '9px' : '10px')};;;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transition: all 100ms;

  & input {
    border: none;
    font-family: 'Times', serif;
    font-size: inherit;
  }

  & input:focus {
    border: none;
    outline: none;
  }
`;

export const ClearButtonContainer = styled.div.attrs(() => ({
  role: 'button',
}))`
  cursor: pointer;
  margin-right: 10px;
  display: flex;

  & :focus {
    border: 2px solid blue;
  }
`;
