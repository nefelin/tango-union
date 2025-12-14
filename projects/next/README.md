# Tango Union Next.js Backend

This is the Next.js backend API for Tango Union, migrated from NestJS.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` file:

```bash
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL=7d
```

3. Run development server:

```bash
npm run dev
```

## API Endpoints

### Auth Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user (requires Bearer token)
- `POST /api/auth/refresh` - Refresh access token (requires Bearer refresh token)

### GraphQL Endpoint

- `POST /api/graphql` - GraphQL endpoint with compoundQuery resolver

## Testing

### Test Auth Endpoints

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpassword123","firstName":"Test","lastName":"User"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpassword123"}'

# GraphQL
curl -X POST http://localhost:3000/api/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"query { compoundQuery(query: { pagination: { limit: 10, offset: 0 } }) { ids totalResults } }"}'
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/route.ts
│   │   │   ├── login/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── refresh/route.ts
│   │   └── graphql/route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── lib/
│   ├── db.ts
│   ├── jwt.ts
│   ├── auth-service.ts
│   ├── models/
│   │   ├── user.ts
│   │   └── track.ts
│   ├── graphql/
│   │   ├── resolvers.ts
│   │   ├── types.ts
│   │   └── util.ts
│   ├── util/
│   │   ├── slop.ts
│   │   └── yearParser/
│   │       ├── yearParser.ts
│   │       └── types.ts
│   └── types.ts
```
