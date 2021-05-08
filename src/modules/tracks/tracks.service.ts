import { BadRequestException, Injectable } from '@nestjs/common';
import { Track, TrackDocument } from '../../schemas/tracks.entity';
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

  allTracks(): Promise<TrackDocument[]> {
    return this.trackModel.find().exec(); //fixme remove limit;
  }

  sampleTracks(): Promise<TrackDocument[]> {
    return this.trackModel.find().limit(500).exec();
  }

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
