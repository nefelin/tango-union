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

  async flagForRescrape(id: TrackId): Promise<SimpleTrack> {
    const trackDoc = await this.trackModel.findOne({ id }).exec();
    trackDoc.youtube.flaggedForRescrape = true;
    trackDoc.markModified('youtube');
    await trackDoc.save();
    return simpleTrackFromTrackDoc(trackDoc);
  }

  async unflagForRescrape(id: TrackId): Promise<SimpleTrack> {
    const trackDoc = await this.trackModel.findOne({ id }).exec();
    trackDoc.youtube.flaggedForRescrape = false;
    trackDoc.markModified('youtube');
    await trackDoc.save();
    return simpleTrackFromTrackDoc(trackDoc);
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
    const { orchestras, singers, genres, text, sort: dirtySort = {}, pagination, year, limitIds } = input;
    const sort = cleanSort(dirtySort);
    // do year business on text input
    const yearParser = new YearParser(null);
    const years = year ? yearParser.yearsFromSearch(year) : null;
    const textWithoutYear = text ? yearParser.stripYearTerms(text) : text; // fixme stripping not needed if we stick with split year term, maybe good for cleaning still?

    const preppedText = andifyMongoTextSearch(textWithoutYear);

    const limitIdsMatch = limitIds ? { id: { $in: limitIds } } : null;

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

    const singerCountMatches = stripNil([orchestraMatch, genreMatch, yearMatch, limitIdsMatch]);
    const yearCountMatches = stripNil([orchestraMatch, genreMatch, singerMatch, limitIdsMatch]);
    const orchestraCountMatches = stripNil([singerMatch, genreMatch, yearMatch, limitIdsMatch]);
    const genreCountMatches = stripNil([orchestraMatch, singerMatch, yearMatch, limitIdsMatch]);
    const allMatches = stripNil([orchestraMatch, singerMatch, genreMatch, yearMatch, limitIdsMatch]);

    const { singer, orchestra, ...rest } = sort;
    const sortFixedArrays = {
      ...rest,
      ...(singer ? { flatSinger: singer } : {}),
      ...(orchestra ? { flatOrchestra: orchestra } : {}),
    }; // to avoid sorting on multiple arrays, we need to transition these sort goals to the pre-sorted, flattened fields
    const sortWithDefault =
      sort && Object.keys(sortFixedArrays).length > 0 ? { ...sortFixedArrays, id: 1 } : { title: 1, id: 1 }; // need to sort by id as a tie breaker for consistant pagination behavior

    const pipeline = [
      textMatch,
      {
        $facet: {
          yearCount: [
            {
              $match: yearCountMatches.length ? { $and: yearCountMatches } : {},
            },
            { $unwind: '$year' },
            { $sortByCount: '$year' },
          ],
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
          total: [
            {
              $match: allMatches.length
                ? {
                    $and: allMatches,
                  }
                : {},
            },
            { $count: 'total' },
          ],
          random: [{ $match: { 'youtube.linkScore': { $gte: 7 } } }, { $sample: { size: 1 } }, { $project: { id: 1 } }],
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
            { $project: { id: 1 } },
          ],
        },
      },
    ];

    const res = await this.trackModel.aggregate<FacetedResults>(stripNil(pipeline));
    return compoundResultsFromFacetedResults(res[0], input.pagination);
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
