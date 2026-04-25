# KingiTravel - AI-Native Resort Discovery & Booking

Production-oriented Next.js App Router project for responsive resort search, compare, booking, memberships, and AI concierge workflows with **live LiteAPI inventory** (no mock resort search data in runtime flows).

## Stack
- Next.js App Router + TypeScript + React
- Tailwind CSS + accessible utility patterns
- Prisma + PostgreSQL
- Stripe Checkout + webhook-driven state transitions
- LiteAPI server wrappers
- Vitest + React Testing Library + Playwright

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env file:
   ```bash
   cp .env.example .env
   ```
3. Add real credentials (`LITEAPI_KEY`, Stripe keys, DB URL).
4. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```
5. Migrate + seed from live LiteAPI destination:
   ```bash
   npm run prisma:migrate
   npm run db:seed
   ```
6. Start app:
   ```bash
   npm run dev
   ```

## Environment variables
See `.env.example` for all required values.

## Live data behavior
- `POST /api/search` queries LiteAPI `/v3.0/data/hotels` and `/v3.0/hotels/rates`.
- `POST /api/prebook` and `POST /api/book` call LiteAPI prebook/book endpoints directly.
- Resort details and compare pages use PostgreSQL/Prisma records, which should be populated via live seed.

## Architecture notes
- `app/`: route segments, pages, and route handlers.
- `components/`: reusable UI primitives and domain UI blocks.
- `lib/ranking`: pluggable transparent scoring + explanation objects.
- `lib/api/liteapi.ts`: server-side LiteAPI wrappers with key enforcement.
- `lib/api/stripe.ts`: checkout session creator for booking + subscription.
- `app/api/webhooks/*`: webhook ingestion points with persistence updates.

## Testing
- Unit tests: ranking, LiteAPI wrappers, Stripe session creation.
- Component tests: search results and compare UI states.
- E2E tests: search, compare, auth, membership flows.

Run:
```bash
npm test
npm run test:e2e
```
