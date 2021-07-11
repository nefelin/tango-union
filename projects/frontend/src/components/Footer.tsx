import styled from 'styled-components';

export const Footer = styled.div`
  width: 100%;
  margin-top: 1vh;
  height: 4vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & .nameplate {
    opacity: 0;
    transition: opacity 1s;
  }
  &:hover {
    & .nameplate {
      opacity: 1;
      transition: opacity 1s;
    }
  }
`;

export const FooterHeader = styled.div`
  font-size: 12px;
`;

export const FooterFooter = styled.div`
  font-size: 9px;
`;
