import { NextRequest, NextResponse } from 'next/server';
import { graphql } from 'graphql';
import mongoose from 'mongoose';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { connectToDatabase } from '@/lib/db';
import { resolvers } from '@/lib/graphql/resolvers';
import { corsHeaders, handleOptionsRequest } from '@/lib/cors';

const schemaString = `
  type RatedYoutube {
    videoId: String!
    unionRating: Float!
    title: String!
    description: String!
    secondsLong: Float!
    whenPosted: String!
    views: Float!
    authorName: String!
    authorUrl: String!
  }

  type SimpleTrack {
    id: String!
    singer: [String!]
    orchestra: [String!]
    title: String!
    genre: String
    secondsLong: Float
    year: Float
    link: RatedYoutube
    linkScore: Float!
    flaggedForRescrape: Boolean
  }

  type CompoundResults {
    ids: [String!]!
    randomId: String!
    totalResults: Float!
    totalPages: Float!
    page: Float!
    counts: SelectIndexCount!
  }

  type CountTuple {
    name: String!
    count: Float!
  }

  type SelectIndexCount {
    year: [CountTuple!]!
    singer: [CountTuple!]!
    orchestra: [CountTuple!]!
    genre: [CountTuple!]!
  }

  input CompoundQueryInput {
    sort: CompoundSortInput
    pagination: PaginationInput
    text: String
    year: String
    orchestras: [String!]
    singers: [String!]
    titles: [String!]
    genres: [String!]
    limitIds: [Float!]
  }

  input CompoundSortInput {
    singer: Float
    orchestra: Float
    genre: Float
    year: Float
    title: Float
    secondsLong: Float
    linkScore: Float
  }

  input PaginationInput {
    limit: Float!
    offset: Float!
  }

  type User {
    firstName: String!
    lastName: String!
    email: String!
    lastLogin: String
    roles: [String!]!
    hash: String!
    likedTracks: [Float!]!
  }

  type Query {
    compoundQuery(query: CompoundQueryInput!): CompoundResults!
    tracksByIds(ids: [String!]!): [SimpleTrack!]!
    trackById(id: String!): SimpleTrack!
    linksForTracks(ids: [String!]!): [RatedYoutube!]!
    whoAmI: User!
  }
`;

const schema = makeExecutableSchema({
  typeDefs: schemaString,
  resolvers,
});

export async function GET(request: NextRequest) {
  // Serve GraphiQL playground in development
  if (process.env.NODE_ENV === 'development') {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>GraphiQL - Tango Union API</title>
  <link href="https://unpkg.com/graphiql@3/graphiql.min.css" rel="stylesheet" />
  <style>
    body { margin: 0; }
    .graphiql-container .graphiql-session-header { display: flex; align-items: center; gap: 10px; }
    .graphiql-container .graphiql-session-header input { flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
  </style>
</head>
<body>
  <div id="graphiql" style="height: 100vh;"></div>
  <script
    crossorigin
    src="https://unpkg.com/react@18/umd/react.production.min.js"
  ></script>
  <script
    crossorigin
    src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
  ></script>
  <script
    crossorigin
    src="https://unpkg.com/graphiql@3/graphiql.min.js"
  ></script>
  <script>
    function getAccessToken() {
      return localStorage.getItem('access') || '';
    }
    
    const fetcher = GraphiQL.createFetcher({
      url: window.location.origin + '/api/graphql',
      headers: () => {
        const token = getAccessToken();
        return token ? { 'Authorization': 'Bearer ' + token } : {};
      },
    });
    
    const defaultQuery = '# Welcome to GraphiQL\\n' +
      '#\\n' +
      '# Example queries:\\n' +
      '#\\n' +
      '# Query tracks:\\n' +
      '# query {\\n' +
      '#   compoundQuery(query: { pagination: { limit: 10, offset: 0 } }) {\\n' +
      '#     ids\\n' +
      '#     totalResults\\n' +
      '#   }\\n' +
      '# }\\n' +
      '#\\n' +
      '# Get user info (requires auth token in localStorage):\\n' +
      '# query {\\n' +
      '#   whoAmI {\\n' +
      '#     email\\n' +
      '#     firstName\\n' +
      '#     lastName\\n' +
      '#   }\\n' +
      '# }\\n' +
      '#\\n' +
      '# Note: To use authenticated queries, set your access token in localStorage:\\n' +
      '# localStorage.setItem(\\'access\\', \\'your-token-here\\')';
    
    const root = ReactDOM.createRoot(document.getElementById('graphiql'));
    root.render(React.createElement(GraphiQL, { 
      fetcher,
      defaultQuery: defaultQuery
    }));
  </script>
</body>
</html>
    `;
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  }
  
  return NextResponse.json({ error: 'GraphQL playground only available in development' }, { status: 404 });
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  return handleOptionsRequest(origin);
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const headers = corsHeaders(origin);

  try {
    console.log('=== GraphQL POST request received ===');
    // Connect to database early and ensure it's ready
    const startTime = Date.now();
    await connectToDatabase();
    const connectTime = Date.now() - startTime;
    console.log(`Database connected in ${connectTime}ms, readyState: ${mongoose.connection.readyState}`);

    const body = await request.json();
    const { query, variables } = body;
    console.log('Query:', query?.substring(0, 100) + '...');
    console.log('Variables:', JSON.stringify(variables));

    if (!query) {
      return NextResponse.json({ error: 'GraphQL query is required' }, { status: 400, headers });
    }

    console.log('Calling graphql with resolvers:', Object.keys(resolvers.Query || {}));
    console.log('compoundQuery resolver type:', typeof resolvers.Query?.compoundQuery);
    
    const result = await graphql({
      schema: schema as any,
      source: query,
      variableValues: variables,
      contextValue: {
        request,
        headers: {
          authorization: request.headers.get('authorization'),
        },
      },
    });
    console.log('GraphQL result:', result.errors ? `Errors: ${result.errors.length}` : 'Success');

    if (result.errors) {
      console.error('GraphQL errors:', result.errors);
      return NextResponse.json(result, { status: 200, headers }); // GraphQL returns 200 even with errors
    }

    return NextResponse.json(result, { status: 200, headers });
  } catch (error: any) {
    console.error('GraphQL error:', error);
    return NextResponse.json({ error: error.message }, { status: 500, headers });
  }
}

