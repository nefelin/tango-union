import { Slide } from '@mui/material';
import React, { useState } from 'react';

import MobileNavbar from '../../components/MobileNavbar';
import MobileSearch, { MobileSearchProps } from '../../components/MobileSearch';
import ResponsivePlaylistBody from '../../components/ResponsivePlaylist/ResponsivePlaylistBody';
import SongCardList from '../../components/ResponsivePlaylist/SongCardList';
import TopBar from '../../components/TopBar';
import YoutubePlayer from '../../components/YoutubePlayer';
import { PlaylistTrack } from '../../hooks/state/usePlaylistsState/types';

interface InternalProps {
  playlistTracks: Array<PlaylistTrack>;
  resultsTracks: Array<PlaylistTrack>;
}
type Props = MobileSearchProps & InternalProps;

const MobileDashBody = ({
  resetSearch,
  setSearch,
  compoundQuery,
  playlistTracks,
  resultsTracks,
  initSearchState,
}: Props) => {
  const [showPanel, setShowPanel] = useState('Search');

  return (
    <>
      <TopBar height="7vh" fixed />
      <div className="flex flex-row relative mt-[7vh] h-[93vh] w-[100vw]">
        <div
          style={{
            opacity: showPanel === 'Search' ? 1 : 0,
            transition: 'all 300ms',
            pointerEvents: showPanel === 'Search' ? undefined : 'none',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          >
            <MobileSearch
              {...{ resetSearch, setSearch, compoundQuery, initSearchState }}
            />
          </div>
        </div>
        <div
          style={{
            opacity: showPanel === 'Results' ? 1 : 0,
            transition: 'all 300ms',
            pointerEvents: showPanel === 'Results' ? undefined : 'none',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          >
            <SongCardList tracks={resultsTracks} />
          </div>
        </div>
        <div
          style={{
            opacity: showPanel === 'Playlist' ? 1 : 0,
            transition: 'all 300ms',
            pointerEvents: showPanel === 'Playlist' ? undefined : 'none',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          >
            <ResponsivePlaylistBody tracks={playlistTracks} />
          </div>
        </div>
        <div
          style={{
            opacity: showPanel === 'Player' ? 1 : 0,
            transition: 'all 300ms',
            pointerEvents: showPanel === 'Player' ? undefined : 'none',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          >
            <YoutubePlayer />
          </div>
        </div>
      </div>
      <MobileNavbar onNav={(newLoc) => setShowPanel(newLoc)} />
    </>
  );
};

export default MobileDashBody;
