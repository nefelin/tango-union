# Vercel Migration Guide: Auth & Search Endpoints

This guide shows how to migrate your NestJS endpoints to Next.js API routes on Vercel.

## Project Structure

```
projects/next/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── register/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── logout/
│   │   │   │   │   └── route.ts
│   │   │   │   └── refresh/
│   │   │   │       └── route.ts
│   │   │   └── graphql/
│   │   │       └── route.ts
│   │   └── [your pages...]
│   ├── lib/
│   │   ├── db.ts          # MongoDB connection
│   │   ├── auth-service.ts # Auth business logic
│   │   ├── jwt.ts         # JWT utilities
│   │   └── graphql/
│   │       ├── schema.ts
│   │       └── resolvers.ts
│   └── [rest of your app]
└── package.json
```

## Step 1: Install Dependencies

```bash
cd projects/next
npm install mongoose bcrypt jsonwebtoken graphql
npm install -D @types/bcrypt @types/jsonwebtoken
```

## Step 2: Set Up MongoDB Connection

```typescript
// src/lib/db.ts
import mongoose from 'mongoose';

let cachedConnection: typeof mongoose | null = null;

export async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  try {
    cachedConnection = await mongoose.connect(uri, {
      maxPoolSize: 1, // Serverless functions only need 1 connection
      serverSelectionTimeoutMS: 5000,
    });
    return cachedConnection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}
```

## Step 3: Create User Model

```typescript
// src/lib/models/user.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  hash: string;
  lastLogin: Date | null;
  refreshHash: string | null;
  roles: string[];
  likedTracks: number[];
}

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  lastLogin: { type: Date, default: null },
  refreshHash: { type: String, default: null },
  roles: { type: [String], required: true },
  likedTracks: { type: [Number], default: [] },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
```

## Step 4: Create JWT Utilities

```typescript
// src/lib/jwt.ts
import jwt from 'jsonwebtoken';
import { IUser } from './models/user';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const ACCESS_TOKEN_TTL = process.env.ACCESS_TOKEN_TTL || '15m';
const REFRESH_TOKEN_TTL = process.env.REFRESH_TOKEN_TTL || '7d';

export interface TokenPayload {
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

export function generateTokens(user: Pick<IUser, 'email' | 'firstName' | 'lastName' | 'roles'>) {
  const payload: TokenPayload = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    roles: user.roles,
  };

  const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_TTL,
  });

  const refresh = jwt.sign(
    { email: user.email },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_TTL,
    }
  );

  return { token, refresh };
}

export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;
}

export function verifyRefreshToken(token: string): { email: string } {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as { email: string };
}
```

## Step 5: Create Auth Service

```typescript
// src/lib/auth-service.ts
import bcrypt from 'bcrypt';
import { connectToDatabase } from './db';
import { User, IUser } from './models/user';
import { generateTokens, verifyAccessToken, verifyRefreshToken } from './jwt';

export async function registerUser(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) {
  await connectToDatabase();

  const existing = await User.findOne({ email: data.email });
  if (existing) {
    throw new Error('Email Address Taken');
  }

  const hash = bcrypt.hashSync(data.password, 10);
  const refreshHash = bcrypt.hashSync(data.password, 10);

  const user = new User({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    hash,
    refreshHash,
    roles: ['USER'],
    lastLogin: new Date(),
  });

  const saved = await user.save();
  const { hash: _, refreshHash: __, ...userData } = saved.toObject();

  return generateTokens(userData as Pick<IUser, 'email' | 'firstName' | 'lastName' | 'roles'>);
}

export async function loginUser(email: string, password: string) {
  await connectToDatabase();

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isValid = bcrypt.compareSync(password, user.hash);
  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  const tokens = generateTokens({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    roles: user.roles,
  });

  user.lastLogin = new Date();
  user.refreshHash = tokens.refresh;
  await user.save();

  return tokens;
}

export async function logoutUser(email: string) {
  await connectToDatabase();

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User does not exist');
  }

  user.refreshHash = null;
  await user.save();
}

export async function refreshTokens(refreshToken: string) {
  await connectToDatabase();

  const { email } = verifyRefreshToken(refreshToken);
  const user = await User.findOne({ email });

  if (!user || user.refreshHash !== refreshToken) {
    throw new Error('Invalid refresh token');
  }

  const tokens = generateTokens({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    roles: user.roles,
  });

  user.refreshHash = tokens.refresh;
  await user.save();

  return tokens;
}

export function getCurrentUser(authHeader: string | null) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  try {
    return verifyAccessToken(token);
  } catch {
    return null;
  }
}
```

## Step 6: Create Auth API Routes

### Register Route

```typescript
// src/app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '@/lib/auth-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName } = body;

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const tokens = await registerUser({ email, password, firstName, lastName });

    return NextResponse.json(tokens, { status: 200 });
  } catch (error: any) {
    if (error.message === 'Email Address Taken') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Login Route

```typescript
// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { loginUser } from '@/lib/auth-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      );
    }

    const tokens = await loginUser(email, password);

    return NextResponse.json(tokens, { status: 200 });
  } catch (error: any) {
    if (error.message === 'Invalid credentials') {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Logout Route

```typescript
// src/app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { logoutUser, getCurrentUser } from '@/lib/auth-service';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const user = getCurrentUser(authHeader);

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await logoutUser(user.email);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Refresh Route

```typescript
// src/app/api/auth/refresh/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { refreshTokens } from '@/lib/auth-service';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Refresh token required' },
        { status: 401 }
      );
    }

    const refreshToken = authHeader.substring(7);
    const tokens = await refreshTokens(refreshToken);

    return NextResponse.json(tokens, { status: 200 });
  } catch (error: any) {
    if (error.message === 'Invalid refresh token') {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

    console.error('Refresh error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

## Step 7: Create Track Model

```typescript
// src/lib/models/track.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IYoutubeLink {
  videoId: string;
  unionRating: number;
  title: string;
  description: string;
  secondsLong: number;
  whenPosted: string;
  views: number;
  authorName: string;
  authorUrl: string;
}

export interface ITrack extends Document {
  id: number;
  title: string;
  singer: string[];
  orchestra: string[];
  genre: string;
  secondsLong: number;
  year: number[];
  youtube: {
    links: IYoutubeLink[];
    linkScore: number;
    flaggedForRescrape: boolean;
  };
}

const YoutubeLinkSchema = new Schema<IYoutubeLink>({
  videoId: String,
  unionRating: Number,
  title: String,
  description: String,
  secondsLong: Number,
  whenPosted: String,
  views: Number,
  authorName: String,
  authorUrl: String,
});

const TrackSchema = new Schema<ITrack>({
  id: { type: Number, required: true, unique: true },
  title: String,
  singer: [String],
  orchestra: [String],
  genre: String,
  secondsLong: Number,
  year: [Number],
  youtube: {
    links: [YoutubeLinkSchema],
    linkScore: Number,
    flaggedForRescrape: Boolean,
  },
});

export const Track = mongoose.models.Track || mongoose.model<ITrack>('Track', TrackSchema);
```

## Step 8: Create GraphQL Resolvers

```typescript
// src/lib/graphql/resolvers.ts
import { connectToDatabase } from '../db';
import { Track, ITrack } from '../models/track';
import { andifyMongoTextSearch, cleanSort, compoundResultsFromFacetedResults } from './util';
import { YearParser } from './yearParser';

// Import your existing utility functions from the NestJS codebase
// You'll need to copy: andifyMongoTextSearch, cleanSort, compoundResultsFromFacetedResults, YearParser

export const resolvers = {
  Query: {
    async compoundQuery(_: any, { query }: any) {
      await connectToDatabase();
      
      const { orchestras, singers, genres, text, sort: dirtySort = {}, pagination, year, limitIds } = query;
      const sort = cleanSort(dirtySort);
      
      const yearParser = new YearParser(null);
      const years = year ? yearParser.yearsFromSearch(year) : null;
      const textWithoutYear = text ? yearParser.stripYearTerms(text) : text;
      const preppedText = andifyMongoTextSearch(textWithoutYear);

      // Build MongoDB aggregation pipeline (copy from tracks.service.ts)
      // ... (same logic as your existing compoundSearch method)
      
      const result = await Track.aggregate(/* pipeline */);
      return compoundResultsFromFacetedResults(result[0], pagination);
    },

    async tracksByIds(_: any, { ids }: { ids: string[] }) {
      await connectToDatabase();
      
      const numIds = ids.map(id => parseInt(id, 10));
      const tracks = await Track.find({ id: { $in: numIds } });
      
      return tracks.map(track => ({
        id: track.id.toString(),
        title: track.title,
        singer: track.singer,
        orchestra: track.orchestra,
        year: track.year,
        genre: track.genre,
        secondsLong: track.secondsLong,
        link: track.youtube.links[0],
        linkScore: track.youtube.linkScore,
        flaggedForRescrape: track.youtube.flaggedForRescrape,
      }));
    },

    async linksForTracks(_: any, { ids }: { ids: string[] }) {
      await connectToDatabase();
      
      const numIds = ids.map(id => parseInt(id, 10));
      const tracks = await Track.find({ id: { $in: numIds } });
      
      return ids.map(id => {
        const track = tracks.find(t => t.id.toString() === id);
        if (!track || !track.youtube) {
          throw new Error(`No links scraped for track ${id}`);
        }
        return track.youtube.links[0];
      });
    },

    async trackById(_: any, { id }: { id: string }) {
      await connectToDatabase();
      
      const track = await Track.findOne({ id: parseInt(id, 10) });
      if (!track) {
        throw new Error(`Track not found: ${id}`);
      }

      return {
        id: track.id.toString(),
        title: track.title,
        singer: track.singer,
        orchestra: track.orchestra,
        year: track.year,
        genre: track.genre,
        secondsLong: track.secondsLong,
        link: track.youtube.links[0],
        linkScore: track.youtube.linkScore,
        flaggedForRescrape: track.youtube.flaggedForRescrape,
      };
    },
  },
};
```

## Step 9: Create GraphQL Route

```typescript
// src/app/api/graphql/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { graphql, buildSchema } from 'graphql';
import { connectToDatabase } from '@/lib/db';
import { resolvers } from '@/lib/graphql/resolvers';

// Copy your GraphQL schema from projects/api/generated/schema.gql
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

  type Query {
    linksForTracks(ids: [String!]!): [RatedYoutube!]!
    tracksByIds(ids: [String!]!): [SimpleTrack!]!
    trackById(id: String!): SimpleTrack!
    compoundQuery(query: CompoundQueryInput!): CompoundResults!
  }
`;

const schema = buildSchema(schemaString);

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { query, variables } = body;

    if (!query) {
      return NextResponse.json(
        { error: 'GraphQL query is required' },
        { status: 400 }
      );
    }

    const result = await graphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: resolvers,
    });

    if (result.errors) {
      console.error('GraphQL errors:', result.errors);
      return NextResponse.json(result, { status: 200 }); // GraphQL returns 200 even with errors
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('GraphQL error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

## Step 10: Update Frontend API URLs

```typescript
// src/lib/getApiUrl.ts
export const getApiUrl = () => {
  // In Next.js, API routes are on the same origin
  if (typeof window !== 'undefined') {
    // Client-side: use relative URL
    return '';
  }
  
  // Server-side: use full URL or relative
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
};

// Update Apollo Client
// src/lib/apolloClient.ts
const httpLink = new HttpLink({ 
  uri: `${getApiUrl()}/api/graphql` 
});
```

## Step 11: Update Auth Functions

```typescript
// src/lib/auth.ts
export async function fetchLogin(email: string, password: string) {
  const response = await fetch(`${getApiUrl()}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }
  
  return response.json();
}

export async function fetchRefreshToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return null;
  }

  const response = await fetch(`${getApiUrl()}/api/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${refreshToken}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}
```

## Step 12: Environment Variables

Create `.env.local`:
```bash
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL=7d
```

In Vercel Dashboard:
1. Go to your project settings
2. Add environment variables
3. Deploy

## Step 13: Testing

### Local Testing
```bash
npm run dev
# Test at http://localhost:3000/api/auth/login
# Test GraphQL at http://localhost:3000/api/graphql
```

### Test with curl
```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test"}'

# GraphQL
curl -X POST http://localhost:3000/api/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ compoundQuery(query: { pagination: { limit: 10, offset: 0 } }) { ids } }"}'
```

## Step 14: Deploy to Vercel

1. **Connect GitHub repo** to Vercel
2. **Set root directory** to `projects/next`
3. **Add environment variables** in Vercel dashboard
4. **Deploy** (automatic on git push)

## Migration Checklist

- [ ] Install dependencies
- [ ] Create MongoDB connection utility
- [ ] Create User and Track models
- [ ] Create JWT utilities
- [ ] Create auth service
- [ ] Create auth API routes (register, login, logout, refresh)
- [ ] Copy GraphQL utilities from NestJS
- [ ] Create GraphQL resolvers
- [ ] Create GraphQL route
- [ ] Update frontend API URLs
- [ ] Update auth functions
- [ ] Test locally
- [ ] Set environment variables
- [ ] Deploy to Vercel
- [ ] Test in production
- [ ] Monitor and optimize

## Notes

- **Connection Pooling**: MongoDB connection is cached between invocations
- **Cold Starts**: First request may be slower (~200-500ms)
- **Error Handling**: All errors should return proper HTTP status codes
- **CORS**: Not needed (same origin)
- **Type Safety**: Share types between frontend and API routes

## Next Steps

1. Start with one endpoint (login) to validate the approach
2. Migrate remaining auth endpoints
3. Migrate GraphQL endpoint
4. Update frontend
5. Deploy and test
6. Monitor performance

