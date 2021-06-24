import React from 'react';

import {
  Loader,
  LoadingLayer,
  LoadingMoreLayer,
  LoadingMoreText,
} from './overlayRenderer/styled';

const renderOverlay = (loading: boolean, loadingMore: boolean) => () => {
  if (loadingMore)
    return (
      <LoadingMoreLayer>
        <LoadingMoreText>Loading More</LoadingMoreText>
        <Loader small />
      </LoadingMoreLayer>
    );
  if (loading)
    return (
      <LoadingLayer>
        <Loader />
      </LoadingLayer>
    );

  return null;
};

export default renderOverlay;
