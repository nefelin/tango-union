import * as r from 'ramda';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Track, TrackDocument } from '../../schemas/tracks.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SimpleTrack } from './dto/simpletrack.entity';
import { TrackId } from 'tango-index';
import { CompoundQueryInput } from './dto/compoundQuery.input';
import { andifyMongoTextSearch, compoundResultsFromFacetedResults } from './util';
import { YearParser } from 'tango-index/dist/searcher/years/yearParser';
import { FacetedResults } from './types';

@Injectable()
export class TracksService {
  // simpleSongCache: Record<number, SimpleTrack> = {};

  constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>) {}

  rateLink(id: number, videoId: string, ratingChange: number): Promise<Track> {
    // this should check if user has already voted on this link
    return this.trackModel
      .findByIdAndUpdate(
        {
          id: { $eq: id },
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

  async specificTracks(ids: TrackId[]): Promise<SimpleTrack[]> {
    return this.trackModel.find({ id: { $in: ids } }).exec();
  }

  async specificTrack(id: TrackId): Promise<SimpleTrack> {
    return this.trackModel.findOne({ id }).exec();
  }

  async compoundSearch(input: CompoundQueryInput) {
    const { orchestras, singers, genres, text, sort, pagination } = input;

    // do year business on text input
    const yearParser = new YearParser(null);
    const years = text ? yearParser.yearsFromSearch(text) : null;
    const textWithoutYear = text ? yearParser.stripYearTerms(text) : text;

    const preppedText = andifyMongoTextSearch(textWithoutYear);

    const textMatch = preppedText?.length
      ? {
          $match: { $text: { $search: preppedText } },
        }
      : { $match: {} };
    const yearMatch = years
      ? {
          year: { $in: years },
        }
      : null;
    const orchestraMatch = orchestras?.length
      ? {
          $or: orchestras.map((name) => ({ orchestra: name })),
        }
      : null;
    const singerMatch = singers?.length ? { $or: singers.map((name) => ({ singer: name })) } : null;
    const genreMatch = genres?.length ? { $or: genres.map((name) => ({ genre: name })) } : null;

    const stripNil = r.reject(r.isNil);

    const singerCountMatches = stripNil([orchestraMatch, genreMatch, yearMatch]);
    const orchestraCountMatches = stripNil([singerMatch, genreMatch, yearMatch]);
    const genreCountMatches = stripNil([orchestraMatch, singerMatch, yearMatch]);
    const allMatches = stripNil([orchestraMatch, singerMatch, genreMatch, yearMatch]);

    const sortWithDefault = sort && Object.keys(sort).length > 0 ? sort : { title: 1 };

    const pipeline = [
      textMatch,
      {
        $facet: {
          singerCount: [
            {
              $match: singerCountMatches.length ? { $and: singerCountMatches } : {},
            },
            { $unwind: '$singer' },
            { $sortByCount: '$singer' },
          ],
          orchestraCount: [
            {
              $match: orchestraCountMatches.length ? { $and: orchestraCountMatches } : {},
            },
            { $unwind: '$orchestra' },
            { $sortByCount: '$orchestra' },
          ],
          genreCount: [
            {
              $match: genreCountMatches.length ? { $and: genreCountMatches } : {},
            },
            { $unwind: '$genre' },
            { $sortByCount: '$genre' },
          ],
          total: [{ $count: 'total' }],
          tracks: [
            {
              $match: allMatches.length
                ? {
                    $and: allMatches,
                  }
                : {},
            },
            { $sort: sortWithDefault },
            pagination ? { $skip: pagination.offset } : { $skip: 0 },
            pagination ? { $limit: pagination.limit } : { $limit: 20 },
          ],
        },
      },
    ];

    const res = await this.trackModel.aggregate<FacetedResults>(stripNil(pipeline));
    return compoundResultsFromFacetedResults(res[0]);
  }

  async linksForTrack(id: number): Promise<Track['youtube']['links']> {
    const thisSong = await this.trackModel.findOne({ id }).exec();
    if (!thisSong) {
      throw BadRequestException;
    }

    if (!thisSong.youtube) {
      throw new Error(`No links scraped for track ${id}`);
    }
    return thisSong.youtube.links;
  }
}
