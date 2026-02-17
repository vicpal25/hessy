# Deployment Guide

This guide covers deploying the Hessy e-commerce platform to production using Railway (backend) and Vercel (frontend).

## Prerequisites

- GitHub account
- Railway account (https://railway.app)
- Vercel account (https://vercel.com)
- Git repository pushed to GitHub

## Architecture

- **Frontend**: Deployed to Vercel (Next.js)
- **Backend**: Deployed to Railway (GraphQL API)
- **Database**: Railway PostgreSQL
- **Cache**: Railway Redis

## Part 1: Deploy Backend to Railway

### 1. Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub
3. Authorize Railway to access your repositories

### 2. Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose `vicpal25/hessy` repository
4. Railway will detect the backend automatically

### 3. Add PostgreSQL Database
1. In your Railway project, click "+ New"
2. Select "Database" → "PostgreSQL"
3. Railway will create a database and set `DATABASE_URL` automatically

### 4. Add Redis
1. Click "+ New" again
2. Select "Database" → "Redis"
3. Railway will create Redis and set `REDIS_URL` automatically

### 5. Configure Backend Service
1. Click on the backend service
2. Go to "Settings" → "Environment"
3. Add these environment variables:
   ```
   NODE_ENV=production
   PORT=4000
   ```
4. The `DATABASE_URL` and `REDIS_URL` are already set by Railway

### 6. Set Root Directory
1. In Settings → "Build"
2. Set "Root Directory" to `backend`
3. Set "Build Command" to `npm install && npm run build`
4. Set "Start Command" to `npm start`

### 7. Deploy
1. Railway will automatically deploy
2. Wait for deployment to complete
3. Copy the public URL (e.g., `https://hessy-backend-production.up.railway.app`)

## Part 2: Deploy Frontend to Vercel

### 1. Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel to access your repositories

### 2. Import Project
1. Click "Add New" → "Project"
2. Import `vicpal25/hessy` repository
3. Vercel will detect Next.js automatically

### 3. Configure Build Settings
1. **Framework Preset**: Next.js (auto-detected)
2. **Root Directory**: `frontend`
3. **Build Command**: `npm run build`
4. **Output Directory**: `.next` (auto-detected)
5. **Install Command**: `npm install`

### 4. Set Environment Variables
1. Add environment variable:
   ```
   NEXT_PUBLIC_GRAPHQL_URL=https://your-railway-backend-url.up.railway.app/graphql
   ```
   Replace with your actual Railway backend URL from Part 1, Step 7

### 5. Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Vercel will provide a URL (e.g., `https://hessy.vercel.app`)

## Part 3: Verify Deployment

### 1. Test Backend
1. Open `https://your-railway-backend-url.up.railway.app/graphql`
2. You should see the GraphQL playground
3. Try a test query:
   ```graphql
   query {
     products {
       id
       name
       basePrice
     }
   }
   ```

### 2. Test Frontend
1. Open your Vercel URL
2. Navigate to the Products page
3. Verify products load correctly
4. Test the shopping cart
5. Test the admin dashboard

## Part 4: Set Up Continuous Deployment

### GitHub Actions (Already Configured)
- CI workflow runs on every push
- Tests and lints code automatically
- Verifies builds succeed

### Automatic Deployments
- **Railway**: Auto-deploys on push to `main` branch
- **Vercel**: Auto-deploys on push to `main` branch
- **Preview Deployments**: Both create preview deployments for pull requests

## Environment Variables Reference

### Backend (Railway)
```
NODE_ENV=production
PORT=4000
DATABASE_URL=<automatically set by Railway>
REDIS_URL=<automatically set by Railway>
```

### Frontend (Vercel)
```
NEXT_PUBLIC_GRAPHQL_URL=https://your-railway-backend-url.up.railway.app/graphql
```

## Troubleshooting

### Backend Issues
- **Database connection errors**: Check `DATABASE_URL` in Railway environment variables
- **Build failures**: Check build logs in Railway dashboard
- **Health check failures**: Verify `/health` endpoint is accessible

### Frontend Issues
- **API connection errors**: Verify `NEXT_PUBLIC_GRAPHQL_URL` is correct
- **Build failures**: Check build logs in Vercel dashboard
- **Environment variables not working**: Redeploy after adding variables

### Common Issues
1. **CORS errors**: Backend CORS is configured for all origins in production
2. **Database not initialized**: Railway runs `init.sql` automatically on first deploy
3. **Missing environment variables**: Both platforms require redeployment after adding variables

## Monitoring

### Railway
- View logs in Railway dashboard
- Monitor resource usage
- Set up alerts for downtime

### Vercel
- View deployment logs
- Monitor function execution
- Check analytics dashboard

## Costs

### Railway Free Tier
- $5 free credit per month
- Enough for small projects
- Upgrade to Pro for more resources

### Vercel Free Tier
- Unlimited deployments
- 100GB bandwidth
- Serverless function execution included

## Next Steps

1. Set up custom domain in Vercel
2. Configure SSL certificates (automatic)
3. Set up monitoring and alerts
4. Configure backup strategy for database
5. Set up staging environment
