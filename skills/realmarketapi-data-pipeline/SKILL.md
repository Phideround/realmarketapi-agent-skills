---
name: realmarketapi-data-pipeline
description: "Designs an ingestion job that stores candles in a database and keeps them current. Use when the user wants their own copy of market data for analytics or apps."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: developer-integration
  role: "Coding agent"
---

# Data Pipeline

Designs an ingestion job that stores candles in a database and keeps them current. Use when the user wants their own copy of market data for analytics or apps.

## Example requests

- "Store XAUUSD candles in Postgres."
- "Design a pipeline to keep 20 symbols updated."

## Data sources

- `GET /api/v1/history`
- `GET /api/v1/candle`
- `GET /api/v1/me`

## Workflow

1. Create a table keyed on symbol, timeframe and `openTime` with upsert semantics.
2. Backfill with paged history within the plan's range.
3. Run an incremental job per timeframe that fetches recent candles and upserts; only closed candles are final.
4. Track the last stored `openTime` per series and alert on gaps.
5. Budget requests against the monthly limit before scheduling.

## Output

- Schema, backfill script, incremental job and a request budget.
- A gap check query.

## Avoid

- Insert-only writes that duplicate the forming candle.
- A schedule that exceeds the plan's quota.

## Access

- **MCP server** (Pro plan and above): `https://ai.realmarketapi.com/mcp?apiKey=YOUR_API_KEY` (Streamable HTTP).
- **REST**: `https://api.realmarketapi.com/api/v1/<route>`, authenticated with the `apiKey` query parameter. Query parameters are camelCase (`symbolCode`, `timeFrame`, `period`, `startTime`, `endTime`, `pageNumber`, `pageSize`).
- **WebSocket** (Plus plan and above): `wss://api.realmarketapi.com/<stream>?apiKey=YOUR_API_KEY&symbolCode=SYMBOL&timeFrame=TF`.
- **Timeframes**: `M1, M5, M15, H1, H4, D1`. The Free plan covers 6 symbols on `M1, M5, H1`.
- **Plan gates**: indicators, insight and market-structure routes need Pro or above; volatility and history need Starter or above. Call `GET /api/v1/me` to see the plan, symbols, timeframes and remaining quota for a key.
- Never print, log or commit an API key. Read it from an environment variable or the client's secret store.
- Full schemas: <https://realmarketapi.com/.well-known/openapi.json>. Docs: <https://realmarketapi.com/en-US/docs>.

## Guardrails

- Fetch fresh data for every answer and quote the candle `openTime` (UTC) the numbers come from. Never invent or estimate a value the API did not return.
- If a call fails, read `errors[].errorCode` from the `application/problem+json` body, say what failed, and continue with what you have instead of guessing.
- RealMarketAPI provides market data and analytics only. It does not place orders, hold funds or supply news, fundamentals or order-book depth.
- Output is informational, not investment advice. State the invalidation level and the main risk with any directional view.
