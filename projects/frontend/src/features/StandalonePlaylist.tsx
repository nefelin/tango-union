import { sum } from 'ramda';
import React from 'react';
import { useParams } from 'react-router';

import { summarizeByOrchestra } from '../components/AutoPlaylistTitle/summarize';
import PlaylistSummary from '../components/PlaylistSummary';
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

  const summaries = summarizeByOrchestra(tracks);
  const summary = summaries.length === 1 ? summaries[0] : null;
  return (
    <>
      <TopBar />
      <PlaylistConfigContext.Provider value={{ name: 'MOBILE_PLAYLIST' }}>
        <div className="rounded border-black md:max-w-md w-full shadow-xl m-auto">
          {summary && (
            <div className="p-2">
              <PlaylistSummary summary={summary} />
            </div>
          )}
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
          <YoutubePlayer width="100%" />
        </div>
      </PlaylistConfigContext.Provider>
    </>
  );
};

export default StandalonePlaylist;
