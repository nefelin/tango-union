import React from 'react';

interface PlaylistConfig {
  name: string;
}

export const PlaylistConfigContext = React.createContext<PlaylistConfig>({
  name: '',
});
