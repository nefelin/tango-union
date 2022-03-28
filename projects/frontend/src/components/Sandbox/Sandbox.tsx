import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import { PlaylistConfigContext } from '../../context/playlistConfig.context';
import { useYoutubePlayerState } from '../../hooks/state/useYoutubePlayerState';
import { SongCard } from '../../stories/SongCard';
import {
  compactTrackFromString,
  compactTrackFromTrackId,
} from '../../types/compactTrack/util';
import useCacheStitchedIdFetch from '../ResultsTable/useCacheStitchedIdFetch';
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
  const { saved } = useParams<{ saved?: string }>();
  const {
    play,
    pause,
    currentTrack,
    youtubePlayerState: { playState },
  } = useYoutubePlayerState();
  const { tracks: routedTracks } = JSON.parse(saved || '{"tracks": []}');
  const [tracks] = useCacheStitchedIdFetch(
    routedTracks.map(compactTrackFromString),
  );

  return (
    <>
      <TopBar />
      <PlaylistConfigContext.Provider value={{ name: 'MOBILE_PLAYLIST' }}>
        {tracks?.map((track) => {
          const trackIsActive = currentTrack?.trackId === track.id;
          return (
            <SongCard
              key={track.listId}
              active={trackIsActive}
              track={track}
              onPlay={
                () =>
                  !trackIsActive || playState === 'stopped'
                    ? play(compactTrackFromTrackId(track.id)) // TODO types are breaking somewhere, this is supposed to be a compactTrack already
                    : pause()
              }
              onMore={() => {}}
            />
          );
        })}
      </PlaylistConfigContext.Provider>
      <YoutubePlayer width="100%" />
    </>
  );
};

export default Sandbox;
