import { connectToDatabase } from '../db';
import { Track, ITrack } from '../models/track';
import { User, IUser } from '../models/user';
import { andifyMongoTextSearch, cleanSort, compoundResultsFromFacetedResults } from './util';
import { YearParser } from '../util/yearParser/yearParser';
import { CompoundQueryInput, FacetedResults } from './types';
import { getCurrentUser } from '../auth-service';
import * as r from 'ramda';

const simpleTrackFromTrackDoc = (track: ITrack | null) => {
  if (!track || !track.youtube) {
    throw new Error(`Track not found or has no youtube data`);
  }
  return {
    id: track.id.toString(),
    title: track.title,
    orchestra: track.orchestra,
    year: track.year?.[0] || null,
    genre: track.genre,
    singer: track.singer,
    secondsLong: track.secondsLong,
    link: track.youtube.links[0] || null,
    linkScore: track.youtube.linkScore,
    flaggedForRescrape: track.youtube.flaggedForRescrape,
  };
};

// Wrapper to ensure resolver never returns null or throws
const safeResolver = (resolverFn: Function) => {
  return async (...args: any[]) => {
    console.log('=== safeResolver wrapper called ===');
    const defaultResult = {
      ids: [],
      randomId: '0',
      totalResults: 0,
      totalPages: 0,
      page: 0,
      counts: {
        year: [],
        singer: [],
        orchestra: [],
        genre: [],
      },
    };

    try {
      console.log('Calling resolver function...');
      const result = await resolverFn(...args);
      console.log('Resolver returned:', result ? 'valid result' : 'null/undefined');
      if (result === null || result === undefined) {
        console.error('Resolver returned null/undefined, using default');
        return defaultResult;
      }
      return result;
    } catch (error: any) {
      console.error('Resolver error caught by wrapper:', error);
      console.error('Error message:', error?.message);
      console.error('Error stack:', error?.stack);
      return defaultResult;
    }
  };
};

// Ensure resolver always returns a value
const compoundQueryResolver = async (_: any, args: any, context: any) => {
  console.log('=== compoundQuery resolver DIRECTLY called by GraphQL ===');
  console.log('Args received:', JSON.stringify({ args, context: context ? 'present' : 'missing' }, null, 2));
  
  // Default return value to ensure we never return null
  const defaultResult = {
    ids: [],
    randomId: '0',
    totalResults: 0,
    totalPages: 0,
    page: 0,
    counts: {
      year: [],
      singer: [],
      orchestra: [],
      genre: [],
    },
  };

  try {
    const { query } = args || {};
    console.log('=== INSIDE compoundQuery try block ===');
    console.log('Query params:', JSON.stringify(query, null, 2));
    
    if (!query) {
      console.warn('No query provided, returning default');
      return defaultResult;
    }
    
    // Try to connect, but don't fail if it doesn't work
    try {
      await connectToDatabase();
      console.log('Database connected in resolver');
    } catch (dbError: any) {
      console.error('Database connection failed in resolver:', dbError.message);
      // Return default result if DB connection fails
      return defaultResult;
    }

    const { orchestras, singers, genres, text, sort: dirtySort = {}, pagination, year, limitIds } = query;
    
    // Ensure pagination has default values
    const safePagination = pagination || { limit: 20, offset: 0 };
    
    const sort = cleanSort(dirtySort);
    
    const yearParser = new YearParser(null);
    const years = year ? yearParser.yearsFromSearch(year) : null;
    const textWithoutYear = text ? yearParser.stripYearTerms(text) : text;
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
          $or: orchestras.map((name: string) => ({ orchestra: name })),
        }
      : null;

    const singerMatch = singers?.length ? { $or: singers.map((name: string) => ({ singer: name })) } : null;
    const genreMatch = genres?.length ? { $or: genres.map((name: string) => ({ genre: name })) } : null;

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
    };

    const sortWithDefault =
      sort && Object.keys(sortFixedArrays).length > 0
        ? { ...sortFixedArrays, id: 1 }
        : { title: 1, id: 1 };

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
          random: [
            { $match: { 'youtube.linkScore': { $gte: 7 } } },
            { $sample: { size: 1 } },
            { $project: { id: 1 } },
          ],
          tracks: [
            {
              $match: allMatches.length
                ? {
                    $and: allMatches,
                  }
                : {},
            },
            { $sort: sortWithDefault },
            { $skip: safePagination.offset },
            { $limit: safePagination.limit },
            { $project: { id: 1 } },
          ],
        },
      },
    ];

    const res = await Track.aggregate<FacetedResults>(stripNil(pipeline) as any);
    console.log('Aggregation result:', res ? `Found ${res.length} results` : 'null');
    if (!res || !res[0]) {
      console.warn('Track.aggregate returned empty result, returning default');
      return defaultResult;
    }
    const result = compoundResultsFromFacetedResults(res[0], safePagination);
    console.log('compoundResultsFromFacetedResults result:', result ? 'valid' : 'null');
    // Ensure we never return null
    if (!result) {
      console.error('compoundResultsFromFacetedResults returned null');
      return defaultResult;
    }
    console.log('Returning result with', result.totalResults, 'total results');
    return result;
    } catch (error: any) {
      console.error('compoundQuery outer catch error:', error);
      console.error('Error message:', error?.message);
      console.error('Error stack:', error?.stack);
      return defaultResult;
    }
};

export const resolvers = {
  Query: {
    compoundQuery: compoundQueryResolver,

    tracksByIds: async (_: any, { ids }: { ids: string[] }) => {
      await connectToDatabase();
      const numIds = ids.map((id) => parseInt(id, 10));
      const tracks = await Track.find({ id: { $in: numIds } });
      return tracks.map(simpleTrackFromTrackDoc);
    },

    trackById: async (_: any, { id }: { id: string }) => {
      await connectToDatabase();
      const track = await Track.findOne({ id: parseInt(id, 10) });
      if (!track) {
        throw new Error(`Track not found: ${id}`);
      }
      return simpleTrackFromTrackDoc(track);
    },

    linksForTracks: async (_: any, { ids }: { ids: string[] }) => {
      await connectToDatabase();
      const numIds = ids.map((id) => parseInt(id, 10));
      const tracks = await Track.find({ id: { $in: numIds } });
      
      return ids.map((id) => {
        const track = tracks.find((t) => t.id.toString() === id);
        if (!track || !track.youtube || !track.youtube.links || track.youtube.links.length === 0) {
          throw new Error(`No links scraped for track ${id}`);
        }
        return track.youtube.links[0];
      });
    },

    whoAmI: async (_: any, __: any, context: any) => {
      await connectToDatabase();
      const authHeader = context?.headers?.authorization || 
                         context?.request?.headers?.get?.('authorization') ||
                         context?.request?.headers?.get?.('Authorization');
      const user = getCurrentUser(authHeader);
      
      if (!user) {
        throw new Error('Unauthorized');
      }

      const userDoc = await User.findOne({ email: user.email });
      if (!userDoc) {
        throw new Error('User not found');
      }

      return {
        firstName: userDoc.firstName,
        lastName: userDoc.lastName,
        email: userDoc.email,
        lastLogin: userDoc.lastLogin?.toISOString() || null,
        roles: userDoc.roles,
        hash: userDoc.hash,
        likedTracks: userDoc.likedTracks,
      };
    },
  },
};

