# Development Setup

## Running Frontend with Next.js Backend

The frontend has been configured to work with the Next.js backend in development mode.

### Configuration Changes

1. **Port Configuration**:

   - Next.js backend runs on port `3000` (default)
   - Frontend dev server runs on port `3001` (changed from 3000 to avoid conflict)

2. **API URL Configuration**:

   - Frontend now points to `http://localhost:3000/api` in development
   - All API endpoints use the `/api` prefix:
     - Auth: `/api/auth/login`, `/api/auth/register`, `/api/auth/logout`, `/api/auth/refresh`
     - GraphQL: `/api/graphql`

3. **Webpack/Node.js Compatibility**:
   - Added `NODE_OPTIONS=--openssl-legacy-provider` to fix OpenSSL compatibility issues with Node.js 17+

### Running the Development Environment

From the root directory:

```bash
yarn start:dev
```

This will start:

- Next.js backend on `http://localhost:3000`
- Frontend dev server on `http://localhost:3001`

### Manual Start (if needed)

```bash
# Terminal 1: Start Next.js backend
cd projects/next
yarn dev

# Terminal 2: Start frontend
cd projects/frontend
yarn start:dev
```

### Environment Variables

Make sure to create `projects/next/.env.local` with:

```
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_secret_key_here
REFRESH_TOKEN_SECRET=your_refresh_secret_key_here
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL=7d
```
