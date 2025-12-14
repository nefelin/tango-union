# Vercel Deployment Guide

This guide will help you deploy the Next.js backend to Vercel (free tier).

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. MongoDB Atlas cluster with your connection string
3. Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Prepare Your Repository

Make sure your code is committed and pushed to your Git repository.

## Step 2: Deploy via Vercel Dashboard

### Option A: Import from Git (Recommended)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your Git repository
4. Configure the project:
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `projects/next` (if deploying from monorepo)
   - **Build Command**: `yarn build` (or `npm run build`)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `yarn install` (or `npm install`)

### Option B: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to the Next.js project
cd projects/next

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No (first time) or Yes (updates)
# - What's your project's name? tango-union-next (or your choice)
# - In which directory is your code located? ./
```

## Step 3: Configure Environment Variables

In the Vercel dashboard, go to your project → **Settings** → **Environment Variables** and add:

### Required Variables

```
MONGODB_URI=your_mongodb_atlas_connection_string
ACCESS_TOKEN_SECRET=your_random_secret_key_here_min_32_chars
REFRESH_TOKEN_SECRET=your_random_refresh_secret_key_here_min_32_chars
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL=7d
```

### Generating Secrets

You can generate secure random secrets using:

```bash
# Generate random secrets
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Run this twice to get two different secrets for `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET`.

### Environment Variable Settings

- **Environment**: Select all (Production, Preview, Development)
- Click **Save** after adding each variable

## Step 4: Configure MongoDB Atlas

1. Go to your MongoDB Atlas dashboard
2. Navigate to **Network Access**
3. Add IP address:
   - For Vercel deployments, you can either:
     - Add `0.0.0.0/0` to allow all IPs (⚠️ Only for development/testing)
     - Or add Vercel's IP ranges (check Vercel docs for current IPs)
   - For production, consider using MongoDB Atlas VPC peering or restrict to specific IPs

## Step 5: Redeploy

After setting environment variables:

1. Go to **Deployments** tab in Vercel
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Or push a new commit to trigger automatic deployment

## Step 6: Verify Deployment

Once deployed, your API will be available at:
- Production: `https://your-project-name.vercel.app`
- API endpoints:
  - `https://your-project-name.vercel.app/api/graphql`
  - `https://your-project-name.vercel.app/api/auth/login`
  - `https://your-project-name.vercel.app/api/auth/register`
  - etc.

### Test the Deployment

```bash
# Test GraphQL endpoint
curl -X POST https://your-project-name.vercel.app/api/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"query { compoundQuery(query: { pagination: { limit: 10, offset: 0 } }) { ids totalResults } }"}'
```

## Monorepo Configuration

If deploying from a monorepo root, you may need to create a `vercel.json` file:

```json
{
  "buildCommand": "cd projects/next && yarn build",
  "outputDirectory": "projects/next/.next",
  "installCommand": "yarn install",
  "framework": "nextjs",
  "rootDirectory": "projects/next"
}
```

However, if you set the **Root Directory** in the Vercel dashboard to `projects/next`, you shouldn't need this file.

## Troubleshooting

### Build Fails

- Check that all dependencies are in `package.json` (not just `devDependencies`)
- Ensure Node.js version is compatible (Vercel uses Node 18.x by default)
- Check build logs in Vercel dashboard

### Database Connection Errors

- Verify `MONGODB_URI` is set correctly in Vercel environment variables
- Check MongoDB Atlas Network Access allows Vercel IPs
- Ensure connection string includes authentication credentials

### API Routes Return 404

- Verify the route files are in `src/app/api/` directory
- Check that the build completed successfully
- Ensure you're using the correct URL path (`/api/...`)

### CORS Errors

- Update `allowedOrigins` in `src/lib/cors.ts` to include your Vercel domain
- Add your production frontend domain to the CORS whitelist

## Free Tier Limits

Vercel's free tier (Hobby plan) includes:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth per month
- ✅ Serverless functions with execution limits
- ✅ Automatic HTTPS
- ⚠️ Function execution time: 10 seconds (Hobby) / 60 seconds (Pro)
- ⚠️ Cold starts may occur with infrequent usage

## Next Steps

1. Update your frontend to point to the Vercel API URL
2. Configure custom domain (optional, available on free tier)
3. Set up environment-specific configurations if needed
4. Monitor function logs in Vercel dashboard

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

