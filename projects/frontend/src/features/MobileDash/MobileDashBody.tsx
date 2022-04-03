import { useReactiveVar } from '@apollo/client';
import React, { useState } from 'react';
import styled from 'styled-components';

import MobileMoreMenu from '../../components/MobileMoreMenu/MobileMoreMenu';
import MobileNavbar from '../../components/MobileNavbar';
import MobileSearch, { MobileSearchProps } from '../../components/MobileSearch';
import ResponsivePlaylistContainer from '../../components/ResponsivePlaylist/ResponsivePlaylistContainer';
import ResponsiveResultList from '../../components/ResponsiveResultList/ResponsiveResultList';
import TopBar from '../../components/TopBar';
import YoutubePlayer from '../../components/YoutubePlayer';
import { PlaylistTrack } from '../../hooks/state/usePlaylistsState/types';
import useSnackbars from '../../hooks/useSnackbars';
import { asVh, layout } from './layout';
import { reactiveMoreState } from './reactiveMoreState';

interface InternalProps {
  playlistTracks: Array<PlaylistTrack>;
}
type Props = MobileSearchProps & InternalProps;

const MobileDashBody = ({
  resetSearch,
  setSearch,
  counts,
  initSearchState,
}: Props) => {
  const [showPanel, setShowPanel] = useState('Search');
  const { snackStack } = useSnackbars();

  return (
    <>
      <TopBar height={asVh(layout.topbar)} fixed />
      <div
        className="flex flex-row relative w-[100vw] overflow-y-hidden"
        style={{
          marginTop: asVh(layout.topbar),
          height: asVh(100 - layout.topbar - layout.navbar),
        }}
      >
        <div
          style={{
            opacity: showPanel === 'Search' ? 1 : 0,
            transition: 'all 300ms',
            pointerEvents: showPanel === 'Search' ? undefined : 'none',
          }}
        >
          <DashPanel>
            <MobileSearch
              {...{ resetSearch, setSearch, counts, initSearchState }}
            />
          </DashPanel>
        </div>
        <div
          style={{
            opacity: showPanel === 'Results' ? 1 : 0,
            transition: 'all 300ms',
            pointerEvents: showPanel === 'Results' ? undefined : 'none',
          }}
        >
          <DashPanel>
            <ResponsiveResultList />
          </DashPanel>
        </div>
        <div
          style={{
            opacity: showPanel === 'Playlist' ? 1 : 0,
            transition: 'all 300ms',
            pointerEvents: showPanel === 'Playlist' ? undefined : 'none',
          }}
        >
          <DashPanel>
            <ResponsivePlaylistContainer />
          </DashPanel>
        </div>
        <div
          style={{
            opacity: showPanel === 'Player' ? 1 : 0,
            transition: 'all 300ms',
            pointerEvents: showPanel === 'Player' ? undefined : 'none',
          }}
        >
          <DashPanel>
            <YoutubePlayer width="100%" />
          </DashPanel>
        </div>
      </div>
      <MobileNavbar onNav={(newLoc) => setShowPanel(newLoc)} />
      <MobileMoreMenu />
      {snackStack}
    </>
  );
};

const DashPanel = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export default MobileDashBody;
