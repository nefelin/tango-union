# AWS Lambda Migration Plan: Auth & Search Endpoints

## Overview

This plan outlines the migration of the primary backend endpoints to AWS Lambda for cost optimization. The focus is on:
1. **Auth endpoints** (REST): register, login, logout, refresh
2. **Search endpoints** (GraphQL): compoundQuery, tracksByIds, linksForTracks, trackById

## Current Architecture

- **Framework**: NestJS with Express
- **Database**: MongoDB (via Mongoose)
- **API Style**: REST (auth) + GraphQL (search)
- **Deployment**: Likely EC2/ECS with PM2
- **Dependencies**: 
  - MongoDB connection (persistent)
  - JWT tokens (access + refresh)
  - bcrypt for password hashing
  - Mongoose models for data access

## Target Architecture

### Lambda Functions Structure

```
lambdas/
├── auth/
│   ├── register/
│   │   ├── handler.ts
│   │   ├── package.json
│   │   └── serverless.yml (or template.yaml)
│   ├── login/
│   ├── logout/
│   └── refresh/
├── search/
│   ├── graphql-handler/
│   │   ├── handler.ts (handles all GraphQL queries)
│   │   ├── resolvers/
│   │   │   ├── compoundQuery.ts
│   │   │   ├── tracksByIds.ts
│   │   │   ├── linksForTracks.ts
│   │   │   └── trackById.ts
│   │   └── package.json
│   └── serverless.yml
└── shared/
    ├── db-connection.ts (MongoDB connection pooling)
    ├── jwt-utils.ts
    ├── models/ (Mongoose schemas)
    └── types.ts
```

### Infrastructure Options

**Option 1: API Gateway + Lambda (Recommended for REST)**
- API Gateway for REST endpoints (`/auth/*`)
- Lambda functions for each auth operation
- Direct Lambda invocation for GraphQL (or API Gateway)

**Option 2: Lambda Function URLs (Simpler, Lower Cost)**
- Function URLs for each endpoint (no API Gateway cost)
- Better for cost optimization
- Simpler setup

**Option 3: API Gateway + Lambda (GraphQL)**
- Single Lambda function handling all GraphQL queries
- API Gateway with GraphQL resolver
- More complex but standard approach

**Recommendation**: Use **Lambda Function URLs** for auth endpoints (simpler, cheaper) and a **single Lambda with Function URL** for GraphQL (or API Gateway if you need more features).

## Migration Steps

### Phase 1: Setup & Infrastructure

1. **Create Lambda Project Structure**
   ```bash
   mkdir -p projects/lambdas/{auth,search,shared}
   ```

2. **Set up AWS CDK or Serverless Framework**
   - Choose: AWS SAM, Serverless Framework, or CDK
   - Recommendation: **AWS SAM** (simpler, AWS-native) or **Serverless Framework** (more features)

3. **Configure MongoDB Connection**
   - Use connection pooling (reuse connections across invocations)
   - Store connection in Lambda container context (outside handler)
   - Handle connection errors gracefully

4. **Set up Environment Variables**
   - `MONGODB_URI` (from Secrets Manager or Parameter Store)
   - `ACCESS_TOKEN_SECRET`
   - `REFRESH_TOKEN_SECRET`
   - `ACCESS_TOKEN_TTL`
   - `REFRESH_TOKEN_TTL`

### Phase 2: Auth Endpoints Migration

#### 2.1 Register Endpoint
- **Input**: `POST /auth/register` with `{ email, password, firstName, lastName }`
- **Output**: `{ token, refresh }`
- **Logic**: 
  - Check if user exists
  - Hash password with bcrypt
  - Create user in MongoDB
  - Generate JWT tokens
  - Return tokens

#### 2.2 Login Endpoint
- **Input**: `POST /auth/login` with `{ email, password }`
- **Output**: `{ token, refresh }`
- **Logic**:
  - Find user by email
  - Compare password hash
  - Update lastLogin and refreshHash
  - Generate JWT tokens
  - Return tokens

#### 2.3 Logout Endpoint
- **Input**: `POST /auth/logout` with JWT in Authorization header
- **Output**: `200 OK`
- **Logic**:
  - Validate JWT token
  - Set user.refreshHash to null
  - Return success

#### 2.4 Refresh Endpoint
- **Input**: `POST /auth/refresh` with refresh token in Authorization header
- **Output**: `{ token, refresh }`
- **Logic**:
  - Validate refresh token
  - Generate new access and refresh tokens
  - Update user.refreshHash
  - Return new tokens

### Phase 3: Search Endpoints Migration

#### 3.1 GraphQL Handler
- Single Lambda function handling all GraphQL queries
- Parse GraphQL query from request body
- Route to appropriate resolver
- Return GraphQL response

#### 3.2 Resolvers to Migrate
- `compoundQuery`: Complex search with faceting, pagination, sorting
- `tracksByIds`: Batch fetch tracks by IDs
- `linksForTracks`: Fetch YouTube links for tracks
- `trackById`: Single track fetch

### Phase 4: Testing & Deployment

1. **Local Testing** (see Dev Loop section)
2. **Deploy to Dev/Staging**
3. **Integration Testing**
4. **Deploy to Production**
5. **Update Frontend API URLs**
6. **Monitor & Optimize**

## Development Loop & Testing

### Local Development Setup

#### Option 1: AWS SAM Local (Recommended)
```bash
# Install AWS SAM CLI
brew install aws-sam-cli  # macOS
# or
pip install aws-sam-cli

# Run locally
sam local start-api  # For REST endpoints
sam local invoke SearchFunction --event events/graphql-event.json
```

#### Option 2: Serverless Framework Offline
```bash
npm install -g serverless
serverless plugin install serverless-offline
serverless offline start
```

#### Option 3: Direct Node.js Testing (Fastest for Development)
Create a test harness that mimics Lambda's event/context:
```typescript
// test/local-handler.ts
import { handler } from './handler';
import { APIGatewayProxyEvent } from 'aws-lambda';

const mockEvent: APIGatewayProxyEvent = {
  httpMethod: 'POST',
  path: '/auth/login',
  body: JSON.stringify({ email: 'test@example.com', password: 'test' }),
  headers: {},
  // ... other required fields
};

handler(mockEvent, mockContext, callback);
```

### Testing Strategy

#### 1. Unit Tests
- Test business logic in isolation
- Mock MongoDB calls
- Test JWT generation/validation
- Test password hashing

```typescript
// Example: auth/login/handler.test.ts
describe('Login Handler', () => {
  it('should return tokens for valid credentials', async () => {
    // Mock MongoDB findOne
    // Mock bcrypt compare
    // Test handler logic
  });
});
```

#### 2. Integration Tests
- Use local MongoDB or MongoDB Atlas (free tier)
- Test full request/response cycle
- Test error cases

```typescript
// Example: auth/login/integration.test.ts
describe('Login Integration', () => {
  it('should login and return tokens', async () => {
    const event = createMockEvent({ email, password });
    const result = await handler(event, context);
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toHaveProperty('token');
  });
});
```

#### 3. Local Lambda Testing
```bash
# Test with SAM Local
sam local invoke LoginFunction --event events/login-event.json

# Or with direct Node.js
node test/local-handler.js
```

#### 4. AWS Lambda Testing
- Deploy to dev environment
- Use AWS Console Test feature
- Use AWS CLI: `aws lambda invoke --function-name ...`
- Use Postman/Insomnia with Function URL

### Recommended Dev Workflow

1. **Write handler code** in TypeScript
2. **Test locally** with mock events (fast iteration)
3. **Run unit tests** (Jest)
4. **Test with SAM Local** (closer to real Lambda)
5. **Deploy to dev** (test in real AWS environment)
6. **Integration test** with real MongoDB
7. **Deploy to production**

### Testing Tools

- **Jest**: Unit and integration tests
- **AWS SAM Local**: Local Lambda execution
- **Serverless Offline**: Alternative local testing
- **Postman/Insomnia**: Test deployed functions
- **AWS Lambda Test**: Built-in AWS Console testing

## Cost Considerations

### Current Costs (Estimated)
- EC2/ECS instance: ~$30-100/month (depending on instance type)
- Always-on server costs

### Lambda Costs (Estimated)
- **Free Tier**: 1M requests/month, 400K GB-seconds
- **After Free Tier**: 
  - $0.20 per 1M requests
  - $0.0000166667 per GB-second
- **Example**: 100K requests/month, 128MB, 500ms avg
  - Requests: ~$0.02
  - Compute: ~$0.10
  - **Total: ~$0.12/month** (vs $30-100 for EC2)

### Additional Costs
- **API Gateway** (if used): $3.50 per million requests
- **Function URLs**: Free (no additional cost)
- **MongoDB**: Same as current (Atlas or self-hosted)
- **CloudWatch Logs**: First 5GB free, then $0.50/GB

### Cost Optimization Tips
1. Use **Function URLs** instead of API Gateway (saves $3.50/M requests)
2. Optimize Lambda memory (right-size for your workload)
3. Use **Provisioned Concurrency** only if needed (adds cost)
4. Enable **Lambda SnapStart** (Java only, but reduces cold starts)
5. Reuse MongoDB connections (reduce execution time)

## Implementation Details

### MongoDB Connection Handling

```typescript
// shared/db-connection.ts
import mongoose from 'mongoose';

let cachedConnection: typeof mongoose | null = null;

export async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const uri = process.env.MONGODB_URI!;
  cachedConnection = await mongoose.connect(uri, {
    maxPoolSize: 1, // Lambda only needs 1 connection
    serverSelectionTimeoutMS: 5000,
  });

  return cachedConnection;
}
```

### Lambda Handler Template

```typescript
// auth/login/handler.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { connectToDatabase } from '../../shared/db-connection';
import { loginUser } from './login-service';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    await connectToDatabase();
    
    const body = JSON.parse(event.body || '{}');
    const result = await loginUser(body.email, body.password);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Configure CORS properly
      },
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
```

### GraphQL Handler

```typescript
// search/graphql-handler/handler.ts
import { APIGatewayProxyEvent } from 'aws-lambda';
import { graphql, buildSchema } from 'graphql';
import { connectToDatabase } from '../../shared/db-connection';
import { resolvers } from './resolvers';

const schema = buildSchema(/* GraphQL schema string */);

export const handler = async (event: APIGatewayProxyEvent) => {
  await connectToDatabase();
  
  const { query, variables } = JSON.parse(event.body || '{}');
  const result = await graphql({
    schema,
    source: query,
    variableValues: variables,
    rootValue: resolvers,
  });

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};
```

## Deployment Strategy

### Option 1: AWS SAM
```yaml
# template.yaml
Resources:
  LoginFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: auth/login/
      Handler: handler.handler
      Runtime: nodejs18.x
      Environment:
        Variables:
          MONGODB_URI: !Ref MongoDBUri
      Events:
        LoginApi:
          Type: HttpApi
          Properties:
            Path: /auth/login
            Method: post
```

### Option 2: Serverless Framework
```yaml
# serverless.yml
service: tango-union-api

functions:
  login:
    handler: auth/login/handler.handler
    events:
      - http:
          path: auth/login
          method: post
    environment:
      MONGODB_URI: ${env:MONGODB_URI}
```

## Migration Checklist

### Pre-Migration
- [ ] Set up AWS account and IAM roles
- [ ] Choose deployment tool (SAM/Serverless/CDK)
- [ ] Set up local development environment
- [ ] Create MongoDB connection utility
- [ ] Extract shared code (JWT, models, types)

### Auth Endpoints
- [ ] Implement register handler
- [ ] Implement login handler
- [ ] Implement logout handler
- [ ] Implement refresh handler
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Test locally with SAM/Serverless
- [ ] Deploy to dev environment
- [ ] Test with real MongoDB
- [ ] Update frontend API URLs (dev)
- [ ] Deploy to production
- [ ] Update frontend API URLs (prod)

### Search Endpoints
- [ ] Extract GraphQL schema
- [ ] Implement GraphQL handler
- [ ] Implement compoundQuery resolver
- [ ] Implement tracksByIds resolver
- [ ] Implement linksForTracks resolver
- [ ] Implement trackById resolver
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Test locally
- [ ] Deploy to dev
- [ ] Test with frontend
- [ ] Deploy to production

### Post-Migration
- [ ] Monitor CloudWatch logs
- [ ] Monitor Lambda metrics (duration, errors)
- [ ] Optimize cold starts if needed
- [ ] Set up alarms for errors
- [ ] Document new architecture
- [ ] Plan migration of remaining endpoints

## Next Steps

1. **Choose deployment tool** (recommend AWS SAM for simplicity)
2. **Set up project structure** in `projects/lambdas/`
3. **Start with one endpoint** (login is a good candidate)
4. **Establish dev loop** with local testing
5. **Iterate and migrate** remaining endpoints

## Questions to Consider

1. **GraphQL vs REST**: Keep GraphQL or convert search to REST?
   - Recommendation: Keep GraphQL (single endpoint, flexible queries)

2. **API Gateway vs Function URLs**: 
   - Recommendation: Function URLs for cost savings

3. **Cold Start Mitigation**: 
   - Use connection pooling
   - Consider Provisioned Concurrency if needed (adds cost)

4. **Error Handling**: 
   - Standardize error responses
   - Set up CloudWatch alarms

5. **CORS Configuration**: 
   - Configure in Lambda response headers
   - Or use API Gateway CORS (if using API Gateway)

