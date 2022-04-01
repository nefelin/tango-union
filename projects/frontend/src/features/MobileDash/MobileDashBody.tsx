import { Button, Fade, Slide } from '@mui/material';
import React, { useState } from 'react';

import MobileNavbar from '../../components/MobileNavbar';
import MobileSearch, { MobileSearchProps } from '../../components/MobileSearch';
import { darienzoLaborde } from '../../components/PlaylistSummary/summarize.test.data';
import ResponsivePlaylistBody from '../../components/ResponsivePlaylist/ResponsivePlaylistBody';
import SongCardList from '../../components/ResponsivePlaylist/SongCardList';
import TopBar from '../../components/TopBar';
import YoutubePlayer from '../../components/YoutubePlayer';
import { PlaylistTrack } from '../../hooks/state/usePlaylistsState/types';
import { playlistTrackFromTrack } from '../../types/compactTrack/util';

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
      <TopBar />
      <div className="flex flex-row relative h-[100vh] w-[100vw]">
        <Slide
          mountOnEnter
          unmountOnExit
          appear={showPanel === 'Search'}
          in={showPanel === 'Search'}
          direction="right"
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
            <MobileSearch {...{ resetSearch, setSearch, compoundQuery, initSearchState }} />
          </div>
        </Slide>
        <Slide
          mountOnEnter
          unmountOnExit
          in={showPanel === 'Results'}
          direction="left"
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
        </Slide>
        <Slide
          mountOnEnter
          unmountOnExit
          in={showPanel === 'Playlist'}
          direction="left"
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
        </Slide>
        <Fade in={showPanel === 'Player'}>
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
        </Fade>
      </div>
      <MobileNavbar onNav={(newLoc) => setShowPanel(newLoc)} />
    </>
  );
};

export default MobileDashBody;
