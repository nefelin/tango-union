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
  ids: Array<Scalars['Float']>;
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
  trackSource: Array<RatedYoutube>;
  tracksByIds: Array<SimpleTrack>;
  trackById: SimpleTrack;
  compoundQuery: CompoundResults;
  allTracks: Array<SimpleTrack>;
};


export type QueryTrackSourceArgs = {
  trackId: Scalars['Float'];
};


export type QueryTracksByIdsArgs = {
  ids: Array<Scalars['Float']>;
};


export type QueryTrackByIdArgs = {
  id: Scalars['Float'];
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
  singer: Array<CountTuple>;
  orchestra: Array<CountTuple>;
  genre: Array<CountTuple>;
};

export type SimpleTrack = {
  __typename?: 'SimpleTrack';
  id: Scalars['Float'];
  singer?: Maybe<Array<Scalars['String']>>;
  orchestra?: Maybe<Array<Scalars['String']>>;
  title: Scalars['String'];
  genre?: Maybe<Scalars['String']>;
  secondsLong?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
};

export type TrackDetailsBatchQueryVariables = Exact<{
  ids: Array<Scalars['Float']> | Scalars['Float'];
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
  & Pick<SimpleTrack, 'id' | 'title' | 'genre' | 'singer' | 'orchestra' | 'secondsLong' | 'year'>
);

export type TrackLinksQueryVariables = Exact<{
  trackId: Scalars['Float'];
}>;


export type TrackLinksQuery = (
  { __typename?: 'Query' }
  & { trackSource: Array<(
    { __typename?: 'RatedYoutube' }
    & Pick<RatedYoutube, 'videoId' | 'unionRating' | 'description' | 'title'>
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
    & { singer: Array<(
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
}
    `;
export const FullCountFragmentFragmentDoc = gql`
    fragment FullCountFragment on CompoundResults {
  counts {
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
    query TrackDetailsBatch($ids: [Float!]!) {
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
export const TrackLinksDocument = gql`
    query TrackLinks($trackId: Float!) {
  trackSource(trackId: $trackId) {
    videoId
    unionRating
    description
    title
  }
}
    `;

/**
 * __useTrackLinksQuery__
 *
 * To run a query within a React component, call `useTrackLinksQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrackLinksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrackLinksQuery({
 *   variables: {
 *      trackId: // value for 'trackId'
 *   },
 * });
 */
export function useTrackLinksQuery(baseOptions: Apollo.QueryHookOptions<TrackLinksQuery, TrackLinksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TrackLinksQuery, TrackLinksQueryVariables>(TrackLinksDocument, options);
      }
export function useTrackLinksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TrackLinksQuery, TrackLinksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TrackLinksQuery, TrackLinksQueryVariables>(TrackLinksDocument, options);
        }
export type TrackLinksQueryHookResult = ReturnType<typeof useTrackLinksQuery>;
export type TrackLinksLazyQueryHookResult = ReturnType<typeof useTrackLinksLazyQuery>;
export type TrackLinksQueryResult = Apollo.QueryResult<TrackLinksQuery, TrackLinksQueryVariables>;
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