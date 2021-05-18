import * as r from 'ramda';
import { Injectable } from '@nestjs/common';
import { TracksService } from '../tracks/tracks.service';
import { Track, TrackDocument } from '../../schemas/tracks.entity';
import { Maybe } from '../../types';
import * as fs from 'fs';
import * as path from 'path';
import { SimpleTrack } from '../tracks/dto/simpletrack.entity';
import { IndexedSongData, indexSongs } from 'tango-index';

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
      this._loadIndex();
    }
  }

  async rebuildIndex() {
    const trackDocs = await this.tracksService.sampleTracks();
    const simpleTracks = r.map(simpleTrackFromTrackDocument)(trackDocs);
    const newIndex = indexSongs(simpleTracks);
    this._writeIndex(newIndex);
    this._loadIndex();
    console.log('Song index built and saved to disk.');
  }

  private async _loadIndex() {
    this.memoryIndex = await JSON.parse(fs.readFileSync(filePath).toString());
    this.tracksService.hydrateSongCache(this.memoryIndex.songs);
    console.log('Song index loaded from disk.');
  }

  private _writeIndex(newIndex: IndexedSongData) {
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

export const SimpleTrackFromTrackDoc = (track: Track): SimpleTrack =>
  r.omit(['youtube', 'updatedAt', '_id'], track);

export const simpleTrackFromTrackDocument: (
  track: TrackDocument,
) => SimpleTrack = r.pipe((t) => t.toObject(), SimpleTrackFromTrackDoc);
