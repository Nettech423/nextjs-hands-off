
# Next.js App Router + Stripe — Hands-Off Railway Deploy

> ⚠️ Security note: This repo includes `.env.local` with LIVE Stripe keys at your request.
> Keep this repo private. Rotate keys if it ever goes public.

## Local
1) `npm install`
2) `npm run dev`
3) Open http://localhost:3000

## Railway
- Push repo to GitHub → New Project on Railway → Deploy from GitHub.
- No env var setup required; `.env.local` is included.
- Webhook URL to add in Stripe: `https://<your-app>.up.railway.app/api/webhook`
