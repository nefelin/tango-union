import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CompoundQueryInput = {
  sort?: Maybe<CompoundSortInput>;
  pagination?: Maybe<PaginationInput>;
  text?: Maybe<Scalars['String']>;
  orchestras?: Maybe<Array<Scalars['String']>>;
  singers?: Maybe<Array<Scalars['String']>>;
  titles?: Maybe<Array<Scalars['String']>>;
  genres?: Maybe<Array<Scalars['String']>>;
};

export type CompoundResults = {
  __typename?: 'CompoundResults';
  ids: Array<Scalars['String']>;
  totalResults: Scalars['Float'];
  counts: SelectIndexCount;
};

export type CompoundSortInput = {
  singer?: Maybe<Scalars['Float']>;
  orchestra?: Maybe<Scalars['Float']>;
  genre?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
  title?: Maybe<Scalars['Float']>;
  secondsLong?: Maybe<Scalars['Float']>;
  linkScore?: Maybe<Scalars['Float']>;
};

export type CountTuple = {
  __typename?: 'CountTuple';
  name: Scalars['String'];
  count: Scalars['Float'];
};

export type PaginationInput = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  linksForTracks: Array<RatedYoutube>;
  tracksByIds: Array<SimpleTrack>;
  trackById: SimpleTrack;
  compoundQuery: CompoundResults;
  allTracks: Array<SimpleTrack>;
};


export type QueryLinksForTracksArgs = {
  ids: Array<Scalars['String']>;
};


export type QueryTracksByIdsArgs = {
  ids: Array<Scalars['String']>;
};


export type QueryTrackByIdArgs = {
  id: Scalars['String'];
};


export type QueryCompoundQueryArgs = {
  query: CompoundQueryInput;
};

export type RatedYoutube = {
  __typename?: 'RatedYoutube';
  videoId: Scalars['String'];
  unionRating: Scalars['Float'];
  title: Scalars['String'];
  description: Scalars['String'];
  secondsLong: Scalars['Float'];
  whenPosted: Scalars['String'];
  views: Scalars['Float'];
  authorName: Scalars['String'];
  authorUrl: Scalars['String'];
};

export type SelectIndexCount = {
  __typename?: 'SelectIndexCount';
  year: Array<CountTuple>;
  singer: Array<CountTuple>;
  orchestra: Array<CountTuple>;
  genre: Array<CountTuple>;
};

export type SimpleTrack = {
  __typename?: 'SimpleTrack';
  id: Scalars['String'];
  singer?: Maybe<Array<Scalars['String']>>;
  orchestra?: Maybe<Array<Scalars['String']>>;
  title: Scalars['String'];
  genre?: Maybe<Scalars['String']>;
  secondsLong?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
  link?: Maybe<RatedYoutube>;
  linkScore?: Maybe<Scalars['Float']>;
};

export type TrackDetailsBatchQueryVariables = Exact<{
  ids: Array<Scalars['String']> | Scalars['String'];
}>;


export type TrackDetailsBatchQuery = (
  { __typename?: 'Query' }
  & { tracksByIds: Array<(
    { __typename?: 'SimpleTrack' }
    & TrackDetailFragmentFragment
  )> }
);

export type TrackDetailFragmentFragment = (
  { __typename?: 'SimpleTrack' }
  & Pick<SimpleTrack, 'id' | 'title' | 'genre' | 'singer' | 'orchestra' | 'secondsLong' | 'year' | 'linkScore'>
  & { link?: Maybe<(
    { __typename?: 'RatedYoutube' }
    & Pick<RatedYoutube, 'description' | 'title' | 'videoId'>
  )> }
);

export type CompoundQueryQueryVariables = Exact<{
  criteria: CompoundQueryInput;
}>;


export type CompoundQueryQuery = (
  { __typename?: 'Query' }
  & { compoundQuery: (
    { __typename?: 'CompoundResults' }
    & Pick<CompoundResults, 'ids' | 'totalResults'>
    & FullCountFragmentFragment
  ) }
);

export type FullCountFragmentFragment = (
  { __typename?: 'CompoundResults' }
  & { counts: (
    { __typename?: 'SelectIndexCount' }
    & { year: Array<(
      { __typename?: 'CountTuple' }
      & Pick<CountTuple, 'name' | 'count'>
    )>, singer: Array<(
      { __typename?: 'CountTuple' }
      & Pick<CountTuple, 'name' | 'count'>
    )>, orchestra: Array<(
      { __typename?: 'CountTuple' }
      & Pick<CountTuple, 'name' | 'count'>
    )>, genre: Array<(
      { __typename?: 'CountTuple' }
      & Pick<CountTuple, 'name' | 'count'>
    )> }
  ) }
);

export const TrackDetailFragmentFragmentDoc = gql`
    fragment TrackDetailFragment on SimpleTrack {
  id
  title
  genre
  singer
  orchestra
  secondsLong
  year
  linkScore
  link {
    description
    title
    videoId
  }
}
    `;
export const FullCountFragmentFragmentDoc = gql`
    fragment FullCountFragment on CompoundResults {
  counts {
    year {
      name
      count
    }
    singer {
      name
      count
    }
    orchestra {
      name
      count
    }
    genre {
      name
      count
    }
  }
}
    `;
export const TrackDetailsBatchDocument = gql`
    query TrackDetailsBatch($ids: [String!]!) {
  tracksByIds(ids: $ids) {
    ...TrackDetailFragment
  }
}
    ${TrackDetailFragmentFragmentDoc}`;

/**
 * __useTrackDetailsBatchQuery__
 *
 * To run a query within a React component, call `useTrackDetailsBatchQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrackDetailsBatchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrackDetailsBatchQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useTrackDetailsBatchQuery(baseOptions: Apollo.QueryHookOptions<TrackDetailsBatchQuery, TrackDetailsBatchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TrackDetailsBatchQuery, TrackDetailsBatchQueryVariables>(TrackDetailsBatchDocument, options);
      }
export function useTrackDetailsBatchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TrackDetailsBatchQuery, TrackDetailsBatchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TrackDetailsBatchQuery, TrackDetailsBatchQueryVariables>(TrackDetailsBatchDocument, options);
        }
export type TrackDetailsBatchQueryHookResult = ReturnType<typeof useTrackDetailsBatchQuery>;
export type TrackDetailsBatchLazyQueryHookResult = ReturnType<typeof useTrackDetailsBatchLazyQuery>;
export type TrackDetailsBatchQueryResult = Apollo.QueryResult<TrackDetailsBatchQuery, TrackDetailsBatchQueryVariables>;
export const CompoundQueryDocument = gql`
    query CompoundQuery($criteria: CompoundQueryInput!) {
  compoundQuery(query: $criteria) {
    ids
    totalResults
    ...FullCountFragment
  }
}
    ${FullCountFragmentFragmentDoc}`;

/**
 * __useCompoundQueryQuery__
 *
 * To run a query within a React component, call `useCompoundQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompoundQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompoundQueryQuery({
 *   variables: {
 *      criteria: // value for 'criteria'
 *   },
 * });
 */
export function useCompoundQueryQuery(baseOptions: Apollo.QueryHookOptions<CompoundQueryQuery, CompoundQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompoundQueryQuery, CompoundQueryQueryVariables>(CompoundQueryDocument, options);
      }
export function useCompoundQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompoundQueryQuery, CompoundQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompoundQueryQuery, CompoundQueryQueryVariables>(CompoundQueryDocument, options);
        }
export type CompoundQueryQueryHookResult = ReturnType<typeof useCompoundQueryQuery>;
export type CompoundQueryLazyQueryHookResult = ReturnType<typeof useCompoundQueryLazyQuery>;
export type CompoundQueryQueryResult = Apollo.QueryResult<CompoundQueryQuery, CompoundQueryQueryVariables>;