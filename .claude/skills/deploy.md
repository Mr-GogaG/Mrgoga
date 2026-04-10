---
name: deploy
description: Build and deploy the website to Vercel production
triggers:
  - "deploy"
  - "go live"
  - "push to production"
  - "update live site"
---

# Deploy Skill

## Quick Deploy (via GitHub — recommended)
```bash
git add -A
git commit -m "describe what changed"
git push origin main
```
Vercel auto-detects push → builds → deploys in ~30s.
Live at: **https://g0ga.vercel.app**

## Manual Deploy (Vercel CLI)
```bash
npm run build        # Test build locally first
vercel --prod        # Deploy to production
```

## Check Deployment Status
```bash
vercel ls            # List recent deployments
vercel logs --environment production --limit 10  # Check for errors
```

## If AI Chat Breaks After Deploy
The `GROQ_API_KEY` env var must be set in Vercel:
```bash
vercel env ls                          # Check if key exists
vercel env add GROQ_API_KEY production # Add if missing
```

## Build Outputs
- `dist/` — static SPA files (HTML, CSS, JS)
- `api/` — Vercel serverless functions (auto-detected)
- No server needed — fully static + serverless
