import React, { CSSProperties } from 'react';

import MobileMoreMenu from '../components/MobileMoreMenu/MobileMoreMenu';
import ResponsivePlaylistContainer from '../components/ResponsivePlaylist/ResponsivePlaylistContainer';
import StandaloneFraming from '../components/ResponsivePlaylist/StandaloneFraming';
import TopBar from '../components/TopBar';
import { useIsMobile } from '../util/isMobile';
import { asVh, layout } from './MobileDash/layout';

const StandalonePlaylist = () => {
  const isMobile = useIsMobile();
  const mobileLayoutAdjustments: CSSProperties = isMobile
    ? { paddingTop: asVh(layout.topbar), boxSizing: 'border-box' }
    : {};
  return (
    <>
      <TopBar fixed={isMobile} />
      <div style={{ ...mobileLayoutAdjustments }}>
        <StandaloneFraming>
          <ResponsivePlaylistContainer simpleCards={true} />
          <MobileMoreMenu />
        </StandaloneFraming>
      </div>
    </>
  );
};

export default StandalonePlaylist;
