import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import "@material-ui/icons";
import BaseTable, {
  BaseTableProps,
  ColumnShape,
  SortOrder,
  TableComponents,
} from "react-base-table";
import "react-base-table/styles.css";
import styled from "styled-components";
import * as r from "ramda";
import {
  SearchOutlined,
  FormatListBulletedOutlined,
  PlayCircleFilledWhiteOutlined,
  PauseCircleOutline,
} from "@material-ui/icons";
import { store } from "../../context/store";
import { RawSong } from "../../indexer/types";
import { Maybe } from "../../shared/types";
import { Action } from "../../context/actions";

const TableHeaderCell: TableComponents["TableHeaderCell"] = ({
  className,
  column: { title },
}) => {
  return <span className={className}>{title}</span>;
};

interface State {
  sortState: Record<string, SortOrder>;
  sortedSongs: RawSong[];
}

const maybeSorted = (
  key: string | number,
  order: Maybe<SortOrder>,
  songs: RawSong[]
) => {
  if (!order) {
    return songs;
  }

  const maybeReverse = order === "asc" ? r.identity : r.reverse;

  return r.pipe<RawSong[], RawSong[], RawSong[]>(
    r.sortBy(r.prop(key as keyof RawSong)),
    maybeReverse
  )(songs);
};

const noSongs: RawSong[] = [];

export const BaseSong = () => {
  const { searchedSongs: songs } = useContext(store);
  const [limit, setLimit] = useState(30);

  const youtubeSearch = () => {};
  const [state, setState] = useState<State>({
    sortState: {},
    sortedSongs: [],
  });

  useEffect(() => {
    setState((prevState) => ({ sortState: {}, sortedSongs: songs }));
  }, [songs]);

  const handleColumnSort: BaseTableProps["onColumnSort"] = ({ key, order }) => {
    // TODO warning is mishmosh of prev state and current state a problem here?
    const { sortState, sortedSongs } = state;

    const newSortState = (sortState[key] === "desc"
      ? "asc"
      : order) as SortOrder;
    setState((prevState) => ({
      // clear the sort state if the previous order is desc
      sortState: {
        ...sortState,
        [key]: newSortState,
      },
      sortedSongs: maybeSorted(key, newSortState, sortedSongs),
    }));
  };

  const data = state.sortedSongs.slice(0, limit);

  return (
    <StyledTableContainer>
      <BaseTable
        fixed
        data={data}
        width={1100}
        height={600}
        onEndReached={() => {
          setLimit((prev) => prev + 30);
        }}
        onEndReachedThreshold={30}
        components={{ TableHeaderCell }}
        columns={columns(youtubeSearch)}
        sortState={state.sortState}
        onColumnSort={handleColumnSort}
      />
    </StyledTableContainer>
  );
};

const StyledTableContainer = styled.div`
  display: flex;
  margin: 10px auto auto auto;
  width: 100%;
`;

const StyledFakeButton = styled.div`
  cursor: pointer;
`;

const PlayCell = ({ song }: SongProps) => {
  const { playing, nowPlayingId, dispatch } = useContext(store);

  const isPlaying =
    playing === "playing" && nowPlayingId === song._id;

  const action: Action = isPlaying
    ? { type: "pause" }
    : { type: "playFromTrackId", id: song._id };

  const Icon = () =>
    isPlaying ? <PauseCircleOutline /> : <PlayCircleFilledWhiteOutlined />;

  return (
    <StyledFakeButton
      onClick={() => {
        dispatch(action);
      }}
    >
      <Icon />
    </StyledFakeButton>
  );
};

interface SongProps {
  song: RawSong;
}

type SongRenderer = FunctionComponent<SongProps>;

const ActionCell: SongRenderer = ({ song }: SongProps) => {
  return (
    <StyledFakeButton>
      <SearchOutlined
        onClick={() => alert("should copy some search criteria")}
      />
      <FormatListBulletedOutlined
        onClick={() => alert("should somehow let us pick a source")}
      />
    </StyledFakeButton>
  );
};

const cellRenderComponent: (
  Comp: SongRenderer
) => ColumnShape<RawSong>["cellRenderer"] = (Comp: SongRenderer) => (data) => {
  return <Comp song={data.rowData} />;
};

const columns: (s: any) => ColumnShape[] = (youtubeSearch: any) => [
  {
    key: "title-play",
    dataKey: "title",
    title: "",
    width: 50,
    cellRenderer: cellRenderComponent(PlayCell),
    sortable: false,
  },
  {
    key: "title",
    dataKey: "title",
    title: "Title",
    width: 250,
    resizable: true,
    sortable: true,
  },
  {
    key: "orchestra",
    dataKey: "orchestra",
    title: "Orchestra",
    width: 200,
    resizable: true,
    sortable: true,
  },
  {
    key: "singer",
    dataKey: "singer",
    title: "Singer",
    width: 200,
    resizable: true,
    sortable: true,
  },
  {
    key: "year",
    dataKey: "year",
    title: "Year",
    width: 100,
    resizable: true,
    sortable: true,
  },
  {
    key: "genre",
    dataKey: "genre",
    title: "Genre",
    width: 100,
    resizable: true,
    sortable: true,
  },
  {
    key: "length",
    dataKey: "length",
    title: "Length",
    width: 75,
    resizable: true,
    sortable: true,
  },
  {
    key: "title-action",
    dataKey: "title",
    title: "",
    width: 100,
    cellRenderer: cellRenderComponent(ActionCell),
    resizable: true,
    sortable: false,
  },
];
