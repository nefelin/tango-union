import { CompoundSearchOpts, IndexInterface } from "../../indexer/indexer";
import * as React from "react";
import { Searchbar } from "../Searchbar/Searchbar";
import { BaseSong } from "../SongTable/SongTable";
import styled from "styled-components";
import { NowPlayingCard } from "../NowPlayingCard/NowPlayingCard";
import { useContext, useEffect } from "react";
import { IndexedSongData } from "../../indexer/types";
import { store } from "../../context/store";

export const SearchDash = () => {
  const { dispatch } = useContext(store);

  useEffect(() => {
    fetch("http://localhost:3001/track/index")
      .then((res) => res.ok && res.json())
      .then((index: IndexedSongData) => {
        if (index) {
          dispatch({ type: "loadIndex", index });
        }
      });
  }, []);

  return (
    <>
      <Searchbar />
      <StyledRow>
        <BaseSong />
        <NowPlayingCard />
      </StyledRow>
      {/* this should only fall back too all songs when there is no search criteria, not when there is no data TODO*/}
      {/*</StyledSongListContainer>*/}
      {/* should be falling bac k to searcher.selectOptions base on search criteria, not hits */}
      {/*<SongTable songs={state.songResults} />*/}
    </>
  );
};

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  height: 600px;
`;

const StyledSongListContainer = styled.div`
  height: 100%;
  border: 2px solid black;
`;

const optsAreEmpty = (opts: CompoundSearchOpts): boolean =>
  !opts.searchQuery?.length &&
  !opts.optionsQuery?.orchestra &&
  !opts.optionsQuery?.singer &&
  !opts.optionsQuery?.genre;
