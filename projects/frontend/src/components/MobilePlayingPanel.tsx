import React from 'react';

import { useGlobalPlaylistsState } from '../hooks/state/useGlobalPlaylistState';
import { useYoutubePlayerState } from '../hooks/state/useYoutubePlayerState';
import { asVh } from '../hooks/useViewport';
import { capitalizeFirstLetter } from '../util/capitalizeFirst';
import TrackControls from './MobilePlayingPanel/TrackControls';
import useCacheStitchedIdFetch from './ResultsTable/useCacheStitchedIdFetch';
import { SongCard } from './SongCard';
import YoutubePlayer from './YoutubePlayer';

const MobilePlayingPanel = () => {
  const {
    context: { nextTrack, previousTrack },
  } = useGlobalPlaylistsState();
  const { currentTrack } = useYoutubePlayerState();

  const [tracks] = useCacheStitchedIdFetch(currentTrack ? [currentTrack] : []);
  const track = tracks?.[0];
  //
  // if (!track)
  // const {singer, orchestra, year, genre} = tracks[0];
  // const sortedSinger = singer ? [...singer].sort(localeCompare) : [];
  // const sortedOrchestra = orchestra ? [...orchestra].sort(localeCompare) : [];
  //
  // const singerOrchDetails = [...sortedOrchestra, ...sortedSinger];
  // const orchSingerText = singerOrchDetails.length
  //   ? singerOrchDetails.join(', ')
  //   : 'Missing Orchestra and Singer';
  //
  // const yearGenreDetails = [year, capitalizeFirstLetter(genre)].filter(
  //   (val) => !!val,
  // );
  // const yearGenreText = yearGenreDetails.length
  //   ? yearGenreDetails.join(', ')
  //   : 'Missing Year and Genre';

  return (
    <div className="flex flex-col p-4 items-center justify-around h-full">
      <YoutubePlayer width="300px" height="300px" />
      {track && (
        <div className="flex flex-col items-center">
          <div className="text-lg font-bold">{`${track.title} - ${track.year}`}</div>
          <div className="text-sm">{track.orchestra?.join(', ')}</div>
          <div className="text-sm">{track.singer?.join(', ')}</div>
        </div>
      )}
      <TrackControls />
    </div>
  );
};

export default MobilePlayingPanel;
