import InputLabel from '@material-ui/core/InputLabel';
import styled from 'styled-components';

export const StyledCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  justify-content: flex-end;
  margin-right: 20px;
`;

export const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const InputSpacer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
`;

export const StyledInputLabel = styled(InputLabel)`
  margin-bottom: 5px;
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

export const SearchInputContainer = styled.div`
  border: 1px solid #d0d0d0;
  border-radius: 5px;
  margin-right: 20px;
  display: flex;
  padding: 10px;
  height: 38px;
  box-sizing: border-box;

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
  align-self: flex-end;
  display: flex;
`;
