import * as r from 'ramda';
import { Injectable } from '@nestjs/common';
import { TracksService } from '../tracks/tracks.service';
import { Track, TrackDocument } from '../../schemas/tracks.entity';
import * as fs from 'fs';
import * as path from 'path';
import { SimpleTrack } from '../tracks/dto/simpletrack.entity';
import { CompoundIndex, Searcher } from 'tango-index';
import { CompoundQueryInput } from './dto/compoundQuery.input';
import { CompoundResults } from './dto/compoundResult.entity';

const fileName = 'songIndex.json';
const filePath = path.join(process.cwd(), `generated/${fileName}`);

@Injectable()
export class IndexService {
  memoryIndex = new CompoundIndex();
  searcher = new Searcher(this.memoryIndex);

  constructor(private readonly tracksService: TracksService) {
    if (!fs.existsSync(filePath)) {
      this.rebuildIndex();
    } else {
      this._loadIndex();
    }
  }

  async rebuildIndex() {
    console.log('Rebuilding index...');
    const trackDocs = await this.tracksService.allTracks();
    const simpleTracks = r.map(simpleTrackFromTrackDocument)(trackDocs);
    this.memoryIndex.resetWithTracks(simpleTracks);
    this._refreshSearcher();
    this._writeIndex();
    console.log('Song index built and saved to disk.');
  }

  private async _loadIndex() {
    console.log('Loading index from disk...');
    const json = fs.readFileSync(filePath).toString();
    this.memoryIndex.fromJSON(json);
    this._refreshSearcher();
    console.log('Song index loaded from disk.');
  }

  private _writeIndex() {
    const newData = JSON.stringify(this.memoryIndex);
    return fs.writeFileSync(filePath, newData);
  }

  private _refreshSearcher() {
    this.searcher = new Searcher(this.memoryIndex);
  }

  compoundSearch(query: CompoundQueryInput): CompoundResults {
    const res = this.searcher.byCompoundSearch(query);

    // gql doesnt like records
    const gqlFriendlyCounts = r.mapObjIndexed(
      (v) =>
        Object.entries(v).map(([member, count]) => ({ name: member, count })),
      res.counts,
    );

    return {
      ...res,
      counts: gqlFriendlyCounts,
    };
  }

  async hydratedResults(
    query: CompoundQueryInput,
  ): Promise<Array<SimpleTrack>> {
    const compRes = this.compoundSearch(query);
    return this.tracksService.specificTracks(compRes.trackIds);
  }
}

export const SimpleTrackFromTrackDoc = (track: Track): SimpleTrack =>
  r.omit(['youtube', 'updatedAt', '_id'], track);

export const simpleTrackFromTrackDocument: (
  track: TrackDocument,
) => SimpleTrack = r.pipe((t) => t.toObject(), SimpleTrackFromTrackDoc);
