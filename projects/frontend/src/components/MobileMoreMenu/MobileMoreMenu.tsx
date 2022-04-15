import { useReactiveVar } from '@apollo/client';
import { Slide } from '@mui/material';
import React from 'react';

import { layout } from '../../features/MobileDash/layout';
import {
  fallbackMoreState,
  reactiveMoreState,
} from '../../features/MobileDash/reactiveMoreState';
import useEnsureValue from '../../hooks/useEnsureValue';
import useViewport, { asVh } from '../../hooks/useViewport';
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
        className="bg-white w-full backdrop-blur-md absolute overflow-hidden"
        style={{
          boxShadow: '0 0 10px rgba(0, 0, 0, .15)',
          height: asVh(100 - layout.topBar),
          // marginTop: asVh(layout.topbar),
          top: asVh(layout.topBar),
        }}
      >
        {menuContent}
      </div>
    </Slide>
  );
};

export default MobileMoreMenu;
