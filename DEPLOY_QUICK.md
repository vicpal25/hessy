# Quick Deployment Reference

## 🚀 Deploy to Production (5 Minutes)

### Step 1: Backend (Railway)
1. Go to [railway.app](https://railway.app) → Sign in with GitHub
2. New Project → Deploy from GitHub → Select `vicpal25/hessy`
3. Add PostgreSQL: Click "+ New" → Database → PostgreSQL
4. Add Redis: Click "+ New" → Database → Redis
5. Configure backend service:
   - Settings → Root Directory: `backend`
   - Environment: Add `NODE_ENV=production` and `PORT=4000`
6. Copy the public URL (e.g., `https://hessy-production.up.railway.app`)

### Step 2: Frontend (Vercel)
1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
2. Add New → Project → Import `vicpal25/hessy`
3. Configure:
   - Root Directory: `frontend`
   - Add environment variable:
     ```
     NEXT_PUBLIC_GRAPHQL_URL=https://your-railway-url.up.railway.app/graphql
     ```
4. Deploy!

### Step 3: Verify
- Backend: Visit `https://your-railway-url.up.railway.app/graphql`
- Frontend: Visit your Vercel URL
- Test: Browse products, add to cart, check admin dashboard

## 🔄 Continuous Deployment

After initial setup, deployments are automatic:
- **Push to `main`** → Auto-deploy to production
- **Open PR** → Auto-create preview deployment
- **GitHub Actions** → Auto-run tests on every push

## 📝 Environment Variables Checklist

### Railway (Backend)
- ✅ `NODE_ENV=production` (manual)
- ✅ `PORT=4000` (manual)
- ✅ `DATABASE_URL` (auto-set by Railway)
- ✅ `REDIS_URL` (auto-set by Railway)

### Vercel (Frontend)
- ✅ `NEXT_PUBLIC_GRAPHQL_URL=https://your-backend.railway.app/graphql` (manual)

## 🐛 Troubleshooting

**Backend won't start?**
- Check Railway logs for errors
- Verify `DATABASE_URL` is set
- Ensure root directory is `backend`

**Frontend can't connect to API?**
- Check `NEXT_PUBLIC_GRAPHQL_URL` is correct
- Verify Railway backend is running
- Check CORS settings (already configured)

**Database not initialized?**
- Railway runs `init.sql` automatically
- Check PostgreSQL service is running
- View logs in Railway dashboard

## 💰 Cost Estimate

**Railway Free Tier**: $5/month credit (sufficient for small projects)
**Vercel Free Tier**: Unlimited deployments

Total: **$0/month** for hobby projects!

## 📚 Full Documentation

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide.
