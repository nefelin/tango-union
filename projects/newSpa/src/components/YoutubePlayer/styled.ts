import { Paper } from '@material-ui/core';
import styled from 'styled-components';

import { WIDGET_WIDTH } from './util';

export const VideoDescriptionContainer = styled(Paper)`
  box-sizing: border-box;
  margin-top: -8px;
  margin-bottom: 5px;
  padding: 8px 3px 3px 3px;
  width: ${WIDGET_WIDTH};
  font-size: 10px;
  color: dimgrey;
`;

export const VideoDescriptionDatum = styled.div`
  margin: 2px;
`;

export const VideoDescriptionLabel = styled.span`
  font-weight: bold;
  color: black;
`;
