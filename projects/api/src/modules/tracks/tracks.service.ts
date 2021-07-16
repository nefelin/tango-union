import * as r from 'ramda';
import { Injectable } from '@nestjs/common';
import { Track, TrackDocument } from '../../schemas/tracks.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SimpleTrack } from './dto/simpletrack.entity';
import { CompoundQueryInput } from './dto/compoundQuery.input';
import { andifyMongoTextSearch, cleanSort, compoundResultsFromFacetedResults, simpleTrackFromTrackDoc } from './util';
import { FacetedResults } from './types';
import { TrackId } from '../../types';
import { YearParser } from '../../util/yearParser/yearParser';

@Injectable()
export class TracksService {
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
    const trackDocs = await this.trackModel.find({ id: { $in: ids } }).exec();
    return trackDocs.map(simpleTrackFromTrackDoc);
  }

  async specificTrack(id: TrackId): Promise<SimpleTrack> {
    const track = await this.trackModel.findOne({ id }).exec();
    return simpleTrackFromTrackDoc(track);
  }

  async compoundSearch(input: CompoundQueryInput) {
    const { orchestras, singers, genres, text, sort: dirtySort = {}, pagination } = input;
    const sort = cleanSort(dirtySort);
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

  async linksForTracks(ids: Array<string>): Promise<Track['youtube']['links']> {
    const numIds = ids.map((id) => parseInt(id, 10));
    const songs = await this.trackModel.find({ id: { $in: numIds } }).exec();
    for (const thisSong of songs) {
      if (!thisSong.youtube) {
        throw new Error(`No links scraped for track ${thisSong.id}`);
      }
    }

    return ids.map((id) => songs.find((song) => song.id === id).youtube.links[0]);
  }
}
