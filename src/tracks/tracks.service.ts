import { Injectable } from '@nestjs/common';
import { Track, TrackDocument } from '../schemas/Track';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { YoutubeSearchService } from '../youtube-search/youtube-search.service';

@Injectable()
export class TracksService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    private readonly youtubeSearchService: YoutubeSearchService,
  ) {}

  rateLink(
    trackId: number,
    videoId: string,
    ratingChange: number,
  ): Promise<Track[]> {
    // this should check if user has already voted on this link
    return this.trackModel
      .updateOne(
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

  dbTracks(): Promise<Track[]> {
    return this.trackModel.find().exec();
  }
}
