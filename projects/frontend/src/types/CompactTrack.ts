import { PlaylistTrack } from '../hooks/state/usePlaylistsState/types';

type ListId = string;
type TrackId = string;
type VideoId = string;

const delimiter = '-';
type Delimiter = typeof delimiter;

type MaybeVideoId = `${Delimiter}${VideoId}` | '';

export type CompoundIdString = `${ListId}${Delimiter}${TrackId}${MaybeVideoId}`;

export interface CompactTrack {
  listId: ListId; // this is the only guaranteed unique id on this object, rename?
  trackId: TrackId;
  videoId?: VideoId;
}

export const compoundIdFromString = (s: CompoundIdString): CompactTrack => {
  const [listId, trackId, videoId] = s.split(delimiter) as [
    string,
    string,
    string | undefined,
  ];
  return {
    listId,
    trackId,
    videoId,
  };
};

export const compoundIdFromTrack = ({
  localSongId,
  id,
}: PlaylistTrack): CompactTrack => ({
  listId: localSongId,
  trackId: id,
});

export class TrackList extends Array<CompactTrack> {
  byId(id: ListId) {
    return this.find(({ listId }) => id === listId);
  }

  indexById(id: ListId) {
    return this.findIndex(({ listId }) => id === listId);
  }

  insertedAt(index: number, ...tracks: Array<CompactTrack>) {
    if (index > this.length - 1) {
      throw new Error('Index out of range on TrackList');
    }

    const beforeInsert = this.slice(0, index);
    const afterInsert =
      index === this.length ? [] : this.slice(index, this.length);

    return [...beforeInsert, ...tracks, ...afterInsert];
  }

  removed(...ids: Array<ListId>) {
    return this.filter(({ listId }) => ids.includes(listId));
  }
}
