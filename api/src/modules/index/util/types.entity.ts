import { SimpleTrack } from '../../tracks/dto/simpletrack.entity';

export interface IndexedSongData {
  songs: SloppedSong[];
  selectIndex: SelectIndex;
}

export type SloppedSong = SimpleTrack & SlopMeta;
export type SelectIndex = Record<IndexedCategory, MemberToTracks>;
export type SelectIndexCount = Record<IndexedCategory, MemberToTrackCount>;

const indexedCategories = ['singer', 'orchestra', 'genre', 'year'] as const;

export type IndexedCategory = typeof indexedCategories[number];

export type TrackId = SimpleTrack['trackId'];

export type CategoryMember = string; // in case we want to type differently at some point

export type MemberToTracks = Record<CategoryMember, TrackId[]>;
export type MemberToTrackCount = Record<CategoryMember, number>;

interface SlopMeta {
  slop: string;
}
