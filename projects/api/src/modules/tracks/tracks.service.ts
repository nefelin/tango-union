import { BadRequestException, Injectable } from '@nestjs/common';
import { Track, TrackDocument } from '../../schemas/tracks.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SimpleTrack } from './dto/simpletrack.entity';
import { TrackId } from 'tango-index';

@Injectable()
export class TracksService {
  // simpleSongCache: Record<number, SimpleTrack> = {};

  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
  ) {}

  rateLink(
    trackId: number,
    videoId: string,
    ratingChange: number,
  ): Promise<Track> {
    // this should check if user has already voted on this link
    return this.trackModel
      .findByIdAndUpdate(
        {
          trackId: { $eq: trackId },
          'links.videoId': { $eq: videoId },
        },
        {
          $inc: { 'links.$.unionRating': ratingChange },
        },
      )
      .exec();
  }

  allTracks(): Promise<TrackDocument[]> {
    return this.trackModel.find().exec();
  }

  sampleTracks(): Promise<TrackDocument[]> {
    return this.trackModel.find().limit(500).exec();
  }

  async specificTracks(trackIds: TrackId[]): Promise<SimpleTrack[]> {
    // return trackIds.map((trackId) => this.simpleSongCache[trackId]);
    const tracks = await this.trackModel.find({ trackId: { $in: trackIds } });
    return tracks;
  }

  // hydrateSongCache(tracks: SimpleTrack[]) {
  //   tracks.forEach((track) => (this.simpleSongCache[track.trackId] = track));
  //   console.log('Track cache is hydrated.');
  // }

  async linksForTrack(id: number): Promise<Track['youtube']['links']> {
    const thisSong = await this.trackModel.findById(id).exec();
    if (!thisSong) {
      throw BadRequestException;
    }

    if (!thisSong.youtube) {
      throw new Error(`No links scraped for track ${id}`);
    }
    return thisSong.youtube.links;
  }
}

const makeOptions = (
  key: string,
  values: string[],
): Array<Record<string, string>> => values.map((value) => ({ [key]: value }));
