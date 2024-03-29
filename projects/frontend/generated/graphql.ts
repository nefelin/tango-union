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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type CompoundQueryInput = {
  sort?: Maybe<CompoundSortInput>;
  pagination?: Maybe<PaginationInput>;
  text?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['String']>;
  orchestras?: Maybe<Array<Scalars['String']>>;
  singers?: Maybe<Array<Scalars['String']>>;
  titles?: Maybe<Array<Scalars['String']>>;
  genres?: Maybe<Array<Scalars['String']>>;
  limitIds?: Maybe<Array<Scalars['Float']>>;
};

export type CompoundResults = {
  __typename?: 'CompoundResults';
  ids: Array<Scalars['String']>;
  randomId: Scalars['String'];
  totalResults: Scalars['Float'];
  totalPages: Scalars['Float'];
  page: Scalars['Float'];
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


export type Mutation = {
  __typename?: 'Mutation';
  flagForRescrape: SimpleTrack;
  unflagForRescrape: SimpleTrack;
  likeTrack: User;
  unlikeTrack: User;
};


export type MutationFlagForRescrapeArgs = {
  trackId: Scalars['String'];
};


export type MutationUnflagForRescrapeArgs = {
  trackId: Scalars['String'];
};


export type MutationLikeTrackArgs = {
  trackId: Scalars['Float'];
};


export type MutationUnlikeTrackArgs = {
  trackId: Scalars['Float'];
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
  whoAmI: User;
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
  linkScore: Scalars['Float'];
  flaggedForRescrape?: Maybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  hash: Scalars['String'];
  lastLogin: Scalars['DateTime'];
  refreshHash: Scalars['String'];
  roles: Array<UserRole>;
  likedTracks: Array<Scalars['Float']>;
};

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  CONTRIBUTOR = 'CONTRIBUTOR'
}

export type FlagRescrapeMutationVariables = Exact<{
  trackId: Scalars['String'];
}>;


export type FlagRescrapeMutation = (
  { __typename?: 'Mutation' }
  & { flagForRescrape: (
    { __typename?: 'SimpleTrack' }
    & TrackFlagChangeFragmentFragment
  ) }
);

export type UnflagRescrapeMutationVariables = Exact<{
  trackId: Scalars['String'];
}>;


export type UnflagRescrapeMutation = (
  { __typename?: 'Mutation' }
  & { unflagForRescrape: (
    { __typename?: 'SimpleTrack' }
    & TrackFlagChangeFragmentFragment
  ) }
);

export type TrackFlagChangeFragmentFragment = (
  { __typename?: 'SimpleTrack' }
  & Pick<SimpleTrack, 'id' | 'flaggedForRescrape'>
);

export type LikeTrackMutationVariables = Exact<{
  trackId: Scalars['Float'];
}>;


export type LikeTrackMutation = (
  { __typename?: 'Mutation' }
  & { likeTrack: (
    { __typename?: 'User' }
    & UserDetailFragmentFragment
  ) }
);

export type UnlikeTrackMutationVariables = Exact<{
  trackId: Scalars['Float'];
}>;


export type UnlikeTrackMutation = (
  { __typename?: 'Mutation' }
  & { unlikeTrack: (
    { __typename?: 'User' }
    & UserDetailFragmentFragment
  ) }
);

export type TrackDetailByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type TrackDetailByIdQuery = (
  { __typename?: 'Query' }
  & { trackById: (
    { __typename?: 'SimpleTrack' }
    & TrackDetailFragmentFragment
  ) }
);

export type TrackDetailFragmentFragment = (
  { __typename?: 'SimpleTrack' }
  & Pick<SimpleTrack, 'id' | 'title' | 'genre' | 'singer' | 'orchestra' | 'secondsLong' | 'year' | 'linkScore' | 'flaggedForRescrape'>
  & { link?: Maybe<(
    { __typename?: 'RatedYoutube' }
    & Pick<RatedYoutube, 'description' | 'title' | 'videoId'>
  )> }
);

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

export type WhoAmIQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoAmIQuery = (
  { __typename?: 'Query' }
  & { whoAmI: (
    { __typename?: 'User' }
    & UserDetailFragmentFragment
  ) }
);

export type UserDetailFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'firstName' | 'lastName' | 'lastLogin' | 'email' | 'roles' | 'hash' | 'likedTracks'>
);

export type CompoundQueryQueryVariables = Exact<{
  criteria: CompoundQueryInput;
}>;


export type CompoundQueryQuery = (
  { __typename?: 'Query' }
  & { compoundQuery: (
    { __typename?: 'CompoundResults' }
    & Pick<CompoundResults, 'ids' | 'randomId' | 'page' | 'totalPages' | 'totalResults'>
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

export const TrackFlagChangeFragmentFragmentDoc = gql`
    fragment TrackFlagChangeFragment on SimpleTrack {
  id
  flaggedForRescrape
}
    `;
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
  flaggedForRescrape
}
    `;
export const UserDetailFragmentFragmentDoc = gql`
    fragment UserDetailFragment on User {
  firstName
  lastName
  lastLogin
  email
  roles
  hash
  likedTracks
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
export const FlagRescrapeDocument = gql`
    mutation FlagRescrape($trackId: String!) {
  flagForRescrape(trackId: $trackId) {
    ...TrackFlagChangeFragment
  }
}
    ${TrackFlagChangeFragmentFragmentDoc}`;
export type FlagRescrapeMutationFn = Apollo.MutationFunction<FlagRescrapeMutation, FlagRescrapeMutationVariables>;

/**
 * __useFlagRescrapeMutation__
 *
 * To run a mutation, you first call `useFlagRescrapeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFlagRescrapeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [flagRescrapeMutation, { data, loading, error }] = useFlagRescrapeMutation({
 *   variables: {
 *      trackId: // value for 'trackId'
 *   },
 * });
 */
export function useFlagRescrapeMutation(baseOptions?: Apollo.MutationHookOptions<FlagRescrapeMutation, FlagRescrapeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FlagRescrapeMutation, FlagRescrapeMutationVariables>(FlagRescrapeDocument, options);
      }
export type FlagRescrapeMutationHookResult = ReturnType<typeof useFlagRescrapeMutation>;
export type FlagRescrapeMutationResult = Apollo.MutationResult<FlagRescrapeMutation>;
export type FlagRescrapeMutationOptions = Apollo.BaseMutationOptions<FlagRescrapeMutation, FlagRescrapeMutationVariables>;
export const UnflagRescrapeDocument = gql`
    mutation UnflagRescrape($trackId: String!) {
  unflagForRescrape(trackId: $trackId) {
    ...TrackFlagChangeFragment
  }
}
    ${TrackFlagChangeFragmentFragmentDoc}`;
export type UnflagRescrapeMutationFn = Apollo.MutationFunction<UnflagRescrapeMutation, UnflagRescrapeMutationVariables>;

/**
 * __useUnflagRescrapeMutation__
 *
 * To run a mutation, you first call `useUnflagRescrapeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnflagRescrapeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unflagRescrapeMutation, { data, loading, error }] = useUnflagRescrapeMutation({
 *   variables: {
 *      trackId: // value for 'trackId'
 *   },
 * });
 */
export function useUnflagRescrapeMutation(baseOptions?: Apollo.MutationHookOptions<UnflagRescrapeMutation, UnflagRescrapeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnflagRescrapeMutation, UnflagRescrapeMutationVariables>(UnflagRescrapeDocument, options);
      }
export type UnflagRescrapeMutationHookResult = ReturnType<typeof useUnflagRescrapeMutation>;
export type UnflagRescrapeMutationResult = Apollo.MutationResult<UnflagRescrapeMutation>;
export type UnflagRescrapeMutationOptions = Apollo.BaseMutationOptions<UnflagRescrapeMutation, UnflagRescrapeMutationVariables>;
export const LikeTrackDocument = gql`
    mutation LikeTrack($trackId: Float!) {
  likeTrack(trackId: $trackId) {
    ...UserDetailFragment
  }
}
    ${UserDetailFragmentFragmentDoc}`;
export type LikeTrackMutationFn = Apollo.MutationFunction<LikeTrackMutation, LikeTrackMutationVariables>;

/**
 * __useLikeTrackMutation__
 *
 * To run a mutation, you first call `useLikeTrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeTrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeTrackMutation, { data, loading, error }] = useLikeTrackMutation({
 *   variables: {
 *      trackId: // value for 'trackId'
 *   },
 * });
 */
export function useLikeTrackMutation(baseOptions?: Apollo.MutationHookOptions<LikeTrackMutation, LikeTrackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeTrackMutation, LikeTrackMutationVariables>(LikeTrackDocument, options);
      }
export type LikeTrackMutationHookResult = ReturnType<typeof useLikeTrackMutation>;
export type LikeTrackMutationResult = Apollo.MutationResult<LikeTrackMutation>;
export type LikeTrackMutationOptions = Apollo.BaseMutationOptions<LikeTrackMutation, LikeTrackMutationVariables>;
export const UnlikeTrackDocument = gql`
    mutation UnlikeTrack($trackId: Float!) {
  unlikeTrack(trackId: $trackId) {
    ...UserDetailFragment
  }
}
    ${UserDetailFragmentFragmentDoc}`;
export type UnlikeTrackMutationFn = Apollo.MutationFunction<UnlikeTrackMutation, UnlikeTrackMutationVariables>;

/**
 * __useUnlikeTrackMutation__
 *
 * To run a mutation, you first call `useUnlikeTrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlikeTrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlikeTrackMutation, { data, loading, error }] = useUnlikeTrackMutation({
 *   variables: {
 *      trackId: // value for 'trackId'
 *   },
 * });
 */
export function useUnlikeTrackMutation(baseOptions?: Apollo.MutationHookOptions<UnlikeTrackMutation, UnlikeTrackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnlikeTrackMutation, UnlikeTrackMutationVariables>(UnlikeTrackDocument, options);
      }
export type UnlikeTrackMutationHookResult = ReturnType<typeof useUnlikeTrackMutation>;
export type UnlikeTrackMutationResult = Apollo.MutationResult<UnlikeTrackMutation>;
export type UnlikeTrackMutationOptions = Apollo.BaseMutationOptions<UnlikeTrackMutation, UnlikeTrackMutationVariables>;
export const TrackDetailByIdDocument = gql`
    query TrackDetailById($id: String!) {
  trackById(id: $id) {
    ...TrackDetailFragment
  }
}
    ${TrackDetailFragmentFragmentDoc}`;

/**
 * __useTrackDetailByIdQuery__
 *
 * To run a query within a React component, call `useTrackDetailByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrackDetailByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrackDetailByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTrackDetailByIdQuery(baseOptions: Apollo.QueryHookOptions<TrackDetailByIdQuery, TrackDetailByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TrackDetailByIdQuery, TrackDetailByIdQueryVariables>(TrackDetailByIdDocument, options);
      }
export function useTrackDetailByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TrackDetailByIdQuery, TrackDetailByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TrackDetailByIdQuery, TrackDetailByIdQueryVariables>(TrackDetailByIdDocument, options);
        }
export type TrackDetailByIdQueryHookResult = ReturnType<typeof useTrackDetailByIdQuery>;
export type TrackDetailByIdLazyQueryHookResult = ReturnType<typeof useTrackDetailByIdLazyQuery>;
export type TrackDetailByIdQueryResult = Apollo.QueryResult<TrackDetailByIdQuery, TrackDetailByIdQueryVariables>;
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
export const WhoAmIDocument = gql`
    query WhoAmI {
  whoAmI {
    ...UserDetailFragment
  }
}
    ${UserDetailFragmentFragmentDoc}`;

/**
 * __useWhoAmIQuery__
 *
 * To run a query within a React component, call `useWhoAmIQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhoAmIQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhoAmIQuery({
 *   variables: {
 *   },
 * });
 */
export function useWhoAmIQuery(baseOptions?: Apollo.QueryHookOptions<WhoAmIQuery, WhoAmIQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WhoAmIQuery, WhoAmIQueryVariables>(WhoAmIDocument, options);
      }
export function useWhoAmILazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WhoAmIQuery, WhoAmIQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WhoAmIQuery, WhoAmIQueryVariables>(WhoAmIDocument, options);
        }
export type WhoAmIQueryHookResult = ReturnType<typeof useWhoAmIQuery>;
export type WhoAmILazyQueryHookResult = ReturnType<typeof useWhoAmILazyQuery>;
export type WhoAmIQueryResult = Apollo.QueryResult<WhoAmIQuery, WhoAmIQueryVariables>;
export const CompoundQueryDocument = gql`
    query CompoundQuery($criteria: CompoundQueryInput!) {
  compoundQuery(query: $criteria) {
    ids
    randomId
    page
    totalPages
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