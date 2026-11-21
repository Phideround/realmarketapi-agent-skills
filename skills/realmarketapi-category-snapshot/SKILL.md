---
name: realmarketapi-category-snapshot
description: "Summarises one asset class such as forex, crypto, stocks, indices or commodities. Use when the user asks about a single market segment rather than one symbol or the whole market."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: market-data
  role: "Market data analyst"
---

# Category Snapshot

Summarises one asset class such as forex, crypto, stocks, indices or commodities. Use when the user asks about a single market segment rather than one symbol or the whole market.

## Example requests

- "How is crypto doing?"
- "Show me the indices right now."

## Data sources

- `GET /api/v1/price/category`

## Workflow

1. Map the request to a category value (Forex, Crypto, Stock, Index, Commodity and so on) and call `GET /api/v1/price/category`.
2. Sort by daily change and mark the top three and bottom three.
3. Note breadth: how many symbols are up against down.

## Output

- Ranked table for the category with price and change.
- Breadth and a one-line read of the segment.

## Avoid

- Mixing categories in one table.
- Inferring cause from price alone; this API has no news feed.

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
