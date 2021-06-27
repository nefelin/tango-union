import styled from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';

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