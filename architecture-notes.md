# Architecture Notes

## Live Inventory (No Mock Runtime Data)
- Search uses LiteAPI live inventory endpoints (`/v3.0/data/hotels`, `/v3.0/hotels/rates`).
- Prebook and book flows call LiteAPI directly and persist identifiers for reconciliation.
- Seed script ingests real LiteAPI hotels/rates into Postgres for compare/detail flows.

## Ranking Transparency
Ranking combines hard filters with weighted scores:
- value (price efficiency)
- niche alignment
- climate comfort
- quality signal
- policy confidence
- distance-to-intent proxy

Each result carries a `why this matched` explanation payload for UI rendering.

## AI Guardrails
- Chat and recommendation endpoints state that pricing/policies come from latest fetched snapshots.
- High-intent signals trigger human-handoff recommendation.

## Serverless-Friendliness
- Route handlers are stateless and idempotent-aware.
- External integrations are wrapped in isolated modules (`lib/api`).
- Suitable for Vercel deployment with managed Postgres and secret environment variables.
