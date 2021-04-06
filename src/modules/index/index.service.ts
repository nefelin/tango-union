import * as r from 'ramda';
import { Injectable } from '@nestjs/common';
import { TracksService } from '../tracks/tracks.service';
import { Track, TrackDocument } from '../../schemas/Track';
import { IndexedSongData, indexSongs } from './util/songProcessor';
import { Maybe } from '../../types';
import * as fs from 'fs';
import * as path from 'path';

const fileName = 'songIndex.json';
const filePath = path.join(process.cwd(), `generated/${fileName}`);

@Injectable()
export class IndexService {
  memoryIndex: Maybe<IndexedSongData> = null;

  constructor(private readonly tracksService: TracksService) {
    if (!fs.existsSync(filePath)) {
      console.log('No song index found, building...');
      this.rebuildIndex();
    } else {
      this.loadIndex();
    }
  }

  async rebuildIndex() {
    const trackDocs = await this.tracksService.sampleTracks();
    const simpleTracks = simpleTracksFromTrackDocuments(trackDocs);
    const newIndex = indexSongs(simpleTracks);
    this.memoryIndex = newIndex;
    this.writeIndex(newIndex);
    console.log('Song index built.');
  }

  async loadIndex() {
    this.memoryIndex = await JSON.parse(fs.readFileSync(filePath).toString());
    console.log('Song index loaded.');
  }

  private writeIndex(newIndex: IndexedSongData) {
    const newData = JSON.stringify(newIndex);
    return fs.writeFileSync(filePath, newData);
  }

  getIndex(): IndexedSongData {
    if (!this.memoryIndex) {
      throw new Error('Index not available.');
    }
    return this.memoryIndex;
  }
}

export type SimpleTrack = Omit<Track, 'youtube'>;

export const stripYoutubeAndTimeStamp = (track: Track): SimpleTrack =>
  r.omit(['youtube', 'updatedAt'], track);

export const simpleTracksFromTrackDocuments: (
  trackDocs: TrackDocument[],
) => SimpleTrack[] = r.map(
  r.pipe((t) => t.toObject(), stripYoutubeAndTimeStamp),
);
