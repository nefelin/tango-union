import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from '../../schemas/Track';
import { Model } from 'mongoose';
import { CompoundQueryInput } from './dto/compoundQuery.input';

@Injectable()
export class TrackQueriesService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
  ) {}

  async compoundQuery({ orchestra, title, genre, singer }: CompoundQueryInput) {
    let results: any;

    results = await this.trackModel.find(
      {
        ...(orchestra ? { orchestra } : {}),
        ...(title ? { title } : {}),
        ...(singer ? { singer } : {}),
        ...(genre ? { genre } : {}),
      },
      { trackId: 1 },
    );

    results = await this.trackModel.find(
      {
        ...(orchestra ? { orchestra } : {}),
        ...(title ? { title } : {}),
        ...(singer ? { singer } : {}),
        ...(genre ? { genre } : {}),
      },
      { trackId: 1 },
    );

    results = await this.trackModel.find(
      {
        ...(orchestra ? { orchestra } : {}),
        ...(title ? { title } : {}),
        ...(singer ? { singer } : {}),
        ...(genre ? { genre } : {}),
      },
      { trackId: 1 },
    );

    const ids = results.map((track) => track.toObject().trackId);
    console.log(ids);
  }
}
