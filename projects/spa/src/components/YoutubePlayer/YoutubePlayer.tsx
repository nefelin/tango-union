import YouTube, { Options } from "react-youtube";
import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import { store } from "../../context/store";
import * as r from "ramda";
import { RawSong } from "../../indexer/types";

const API_MINIMUMS = {
  height: 70,
  width: 120,
};

const opts = (autoplay?: boolean): Options => ({
  height: API_MINIMUMS.height * 2.5 + "px",
  width: API_MINIMUMS.width * 2.5 + "px",
  playerVars: {
    autoplay: autoplay ? 1 : 0,
  },
});

const StyledPaper = styled(Paper)`
  padding: 25px;
  width: 100%;
  height: 100%;
  margin: 10px;
`;

export const YoutubePlayer = () => {
  const {
    nowPlayingId,
    dispatch,
    index,
    searchedSongs,
    playing,
    youtubePlayer,
  } = useContext(store);
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    if (!nowPlayingId) {
      return
    }
    fetch(`http://localhost:3001/track/${nowPlayingId}/links`)
      .then((res) => res.json())
      .then((links: any) =>
      {
        setVideoId(links[0].videoId)
      });
  }, [nowPlayingId]);

  useEffect(() => {
    switch (playing) {
      case "paused":
        youtubePlayer?.pauseVideo();
        break;
      case "playing":
        youtubePlayer?.playVideo();
        break;
      case "stopped":
        youtubePlayer?.stopVideo();
        break;
    }
  }, [playing]);

  const nextTrack = useCallback(() => {
    console.log("next?");
    if (searchedSongs && nowPlayingId) {
      const thisSongIndex = r.findIndex(
        r.propEq("_id", nowPlayingId),
        searchedSongs
      );

      if (thisSongIndex >= searchedSongs.length - 1) {
        // last song in the playlist
        dispatch({ type: "setPlayState", playState: "stopped" });
      } else {
        const nextTrack = index.songs[thisSongIndex + 1] as typeof index.songs[0];
        const nextId = nextTrack._id;
        console.log("nextId", nextId);
        dispatch({ type: "playFromTrackId", id: nextId });
      }
    }
  }, [searchedSongs, nowPlayingId]);

  // console.log({videoId, playing, nowPlayingId})
  return (
    <YouTube
      onReady={(e) => {
        dispatch({ type: "loadPlayer", player: e.target });
      }}
      onPause={() => dispatch({ type: "setPlayState", playState: "paused" })}
      onEnd={nextTrack}
      onPlay={() => dispatch({ type: "setPlayState", playState: "playing" })}
      videoId={videoId}
      opts={opts(true)}
    />
  );
};
