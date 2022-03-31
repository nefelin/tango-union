import React from 'react';

import ResponsivePlaylistContainer from '../components/ResponsivePlaylist/ResponsivePlaylistContainer';
import StandaloneFraming from '../components/ResponsivePlaylist/StandaloneFraming';
import TopBar from '../components/TopBar';

const StandalonePlaylist = () => {
  return <><TopBar/><StandaloneFraming><ResponsivePlaylistContainer/></StandaloneFraming></>
};

export default StandalonePlaylist;
