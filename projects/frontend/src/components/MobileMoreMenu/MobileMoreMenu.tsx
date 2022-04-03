import { useReactiveVar } from '@apollo/client';
import { MenuItem, Slide } from '@mui/material';
import React from 'react';

import { asVh, layout } from '../../features/MobileDash/layout';
import { reactiveMoreState } from '../../features/MobileDash/reactiveMoreState';
import PlaylistMenu from './PlaylistMenu';
import ResultsMenu from './ResultsMenu';
const MobileMoreMenu = () => {
  const moreState = useReactiveVar(reactiveMoreState);

  if (!moreState) {
    return <>More menu error</>; // this should never be rendered
  }

  const menuContent =
    moreState?.songSource === 'playlist' ? (
      <PlaylistMenu track={moreState.track} />
    ) : (
      <ResultsMenu track={moreState.track} />
    );

  return (
    <Slide unmountOnExit mountOnEnter in={!!moreState} direction="up">
      <div
        className="bg-white w-full h-full backdrop-blur-md absolute top-0"
        style={{ paddingTop: asVh(layout.topbar) }}
      >
        {menuContent}
      </div>
    </Slide>
  );
};

export default MobileMoreMenu;
