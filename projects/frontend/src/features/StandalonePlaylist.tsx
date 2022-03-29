import React from 'react';
import { useParams } from 'react-router';

import useCacheStitchedIdFetch from '../components/ResultsTable/useCacheStitchedIdFetch';
import { SongCard } from '../components/SongCard';
import TopBar from '../components/TopBar';
import YoutubePlayer from '../components/YoutubePlayer';
import { PlaylistConfigContext } from '../context/playlistConfig.context';
import { useYoutubePlayerState } from '../hooks/state/useYoutubePlayerState';
import {
  compactTrackFromString,
  compactTrackFromTrackId,
} from '../types/compactTrack/util';

const StandalonePlaylist = () => {
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
              playing={playState === 'playing' || playState === 'loading'}
              track={track}
              onPlay={() =>
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

export default StandalonePlaylist;
