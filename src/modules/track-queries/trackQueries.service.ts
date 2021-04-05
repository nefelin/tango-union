import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from '../../schemas/Track';
import { Model } from 'mongoose';
import { CompoundQueryInput } from './dto/compoundQuery.input';
import { reduceToIntersection } from './util';

@Injectable()
export class TrackQueriesService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
  ) {}

  async compoundQuery({ orchestra, title, genre, singer }: CompoundQueryInput) {
    // fixme missing year

    const searchesOmitting: Record<
      string,
      Record<string, string | string[] | number>
    > = {};
    const resultsOmitting: Record<string, Set<number>> = {};

    // get results for each combination (omitting one field so we can hydrate those song counts)
    searchesOmitting['orchestra'] = {
      ...(title ? { title } : {}),
      ...(singer ? { singer } : {}),
      ...(genre ? { genre } : {}),
    };

    searchesOmitting['title'] = {
      ...(orchestra ? { orchestra } : {}),
      ...(singer ? { singer } : {}),
      ...(genre ? { genre } : {}),
    };

    searchesOmitting['genre'] = {
      ...(title ? { title } : {}),
      ...(singer ? { singer } : {}),
      ...(orchestra ? { orchestra } : {}),
    };

    searchesOmitting['singer'] = {
      ...(title ? { title } : {}),
      ...(genre ? { genre } : {}),
      ...(orchestra ? { orchestra } : {}),
    };

    // run searches
    for (const [key, value] of Object.entries(searchesOmitting)) {
      if (value !== {}) {
        resultsOmitting[key] = new Set(
          (
            await this.trackModel.find(value, {
              trackId: 1,
              _id: 0,
            })
          ).map((track) => track.toObject().trackId),
        );
      }
    }

    // compare indexed song counts with results to get updated counts, room for optimization here

    // intersect all results for actual result set
    const finalResults = reduceToIntersection(Object.values(resultsOmitting));

    console.log(finalResults);
    return [];
  }
}
