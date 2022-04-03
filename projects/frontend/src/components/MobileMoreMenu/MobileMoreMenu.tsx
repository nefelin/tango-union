import { useReactiveVar } from '@apollo/client';
import { Slide } from '@mui/material';
import React from 'react';

import { asVh, layout } from '../../features/MobileDash/layout';
import {
  fallbackMoreState,
  reactiveMoreState,
} from '../../features/MobileDash/reactiveMoreState';
import useEnsureValue from '../../hooks/useEnsureValue';
import PlaylistMenu from './PlaylistMenu';
import ResultsMenu from './ResultsMenu';

const MobileMoreMenu = () => {
  const moreState = useReactiveVar(reactiveMoreState);

  const ensuredMoreState = useEnsureValue(moreState, fallbackMoreState);
  const menuContent =
    ensuredMoreState.songSource === 'playlist' ? (
      <PlaylistMenu track={ensuredMoreState.track} />
    ) : (
      <ResultsMenu track={ensuredMoreState.track} />
    );

  return (
    <Slide unmountOnExit mountOnEnter in={!!moreState} direction="up">
      <div
        className="bg-white w-full h-full backdrop-blur-md absolute top-0 overflow-hidden"
        style={{
          boxShadow: '0 0 10px rgba(0, 0, 0, .15)',
          // height: asVh(100 - layout.topbar),
          marginTop: asVh(layout.topbar),
        }}
      >
        {menuContent}
      </div>
    </Slide>
  );
};

export default MobileMoreMenu;
