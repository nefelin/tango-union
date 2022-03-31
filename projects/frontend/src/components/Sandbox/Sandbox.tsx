import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import { PlaylistConfigContext } from '../../context/playlistConfig.context';
import { useYoutubePlayerState } from '../../hooks/state/useYoutubePlayerState';
import {
  compactTrackFromString,
  compactTrackFromTrackId,
} from '../../types/compactTrack/util';
import useCacheStitchedIdFetch from '../ResultsTable/useCacheStitchedIdFetch';
import { SongCard } from '../SongCard';
import TopBar from '../TopBar';
import YoutubePlayer from '../YoutubePlayer';

interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

const colourOptions: ReadonlyArray<ColourOption> = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
];

const Sandbox = () => {
  return (
    <div>
      <Button
        onClick={() =>
          navigator.share({
            title: 'Tango Union',
            text: "Juan D'Arienzo - Armando Laborde",
            url: window.location.href,
          })
        }
      >
        Share
      </Button>
    </div>
  );
};

export default Sandbox;
