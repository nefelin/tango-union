import React from 'react';
import styled from 'styled-components';

import MobileMoreMenu from '../../components/MobileMoreMenu/MobileMoreMenu';
import MobileNavbar, { PanelOption } from '../../components/MobileNavbar';
import MobilePlayerBar from '../../components/MobilePlayerBar';
import MobilePlayingPanel from '../../components/MobilePlayingPanel';
import MobileSearch, { MobileSearchProps } from '../../components/MobileSearch';
import ResponsivePlaylistContainer from '../../components/ResponsivePlaylist/ResponsivePlaylistContainer';
import ResponsiveResultList from '../../components/ResponsiveResultList/ResponsiveResultList';
import TopBar from '../../components/TopBar';
import { PlaylistTrack } from '../../hooks/state/usePlaylistsState/types';
import { useRoutedState } from '../../hooks/state/useRoutedState';
import useSnackbars from '../../hooks/useSnackbars';
import { asVh } from '../../hooks/useViewport';
import { layout } from './layout';

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
  const { snackStack } = useSnackbars();
  const { setPanelPlayer, panel, player } = useRoutedState();

  const handleNav = (newLoc: PanelOption) => {
    if (player) {
      setPanelPlayer({ panel: newLoc, player: false });
    } else {
      setPanelPlayer({ panel: newLoc });
    }
  };

  const maybePlayerBarSpace = player ? 0 : layout.playerBar; // todo does not make space for playerBar when player is showing (cause playerbar is hidden) this is a hacky fix and layout could use a revamp

  return (
    <>
      <TopBar height={asVh(layout.topBar)} fixed />
      <div
        className="flex flex-row relative w-[100vw] overflow-y-hidden"
        style={{
          marginTop: asVh(layout.topBar),
          height: asVh(
            100 - layout.topBar - layout.navBar - maybePlayerBarSpace,
          ),
        }}
      >
        <div
          style={{
            opacity: panel === 'search' ? 1 : 0,
            transition: 'all 300ms',
            pointerEvents: panel === 'search' ? undefined : 'none',
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
            opacity: panel === 'results' ? 1 : 0,
            transition: 'all 300ms',
            pointerEvents: panel === 'results' ? undefined : 'none',
          }}
        >
          <DashPanel>
            <ResponsiveResultList />
          </DashPanel>
        </div>
        <div
          style={{
            opacity: panel === 'playlist' ? 1 : 0,
            transition: 'all 300ms',
            pointerEvents: panel === 'playlist' ? undefined : 'none',
          }}
        >
          <DashPanel>
            <ResponsivePlaylistContainer sortable />
          </DashPanel>
        </div>
        <div
          style={{
            opacity: player ? 1 : 0,
            transition: 'all 300ms',
            pointerEvents: player ? undefined : 'none',
          }}
        >
          <DashPanel>
            <MobilePlayingPanel />
          </DashPanel>
        </div>
      </div>
      {!player && (
        <MobilePlayerBar onClick={() => setPanelPlayer({ player: true })} />
      )}
      <MobileNavbar current={panel} onNav={handleNav} />
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
