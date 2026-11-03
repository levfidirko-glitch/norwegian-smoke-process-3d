# Norwegian Smoke — production foundation

Includes Next.js, PostgreSQL/Prisma, seeded product database, admin authentication, inventory, delivery zones, order creation, Freedom Pay Kazakhstan integration scaffold, payment result webhook endpoint, SMTP-ready email layer, legal page placeholders, analytics environment variable, Vercel config path, and asset folders for real product photos/fonts.

## Run
1. Copy `.env.example` to `.env`.
2. `docker compose up -d`
3. `npm install`
4. `npm run db:push`
5. `npm run db:seed`
6. `npm run dev`

## Payment
Freedom Pay is wired as the first Kazakhstan gateway. Production credentials are required. Configure merchant ID, secret and callback URLs. The merchant Result URL is the server-side payment notification path. Verify and harden signature validation against your merchant account before launch.

Official docs: https://docs.freedompay.kz/api-11620859
https://docs.freedompay.kz/api-12108349

## Not yet supplied
Real product photos and exact brand font files must be supplied and placed in `public/images/products` and `public/fonts`. Legal pages must be replaced with documents reviewed for the actual Kazakhstan legal entity.

## Deployment
Recommended: Vercel for Next.js + managed PostgreSQL. Configure all `.env` values in the hosting dashboard.
