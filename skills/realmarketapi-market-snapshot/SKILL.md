---
name: realmarketapi-market-snapshot
description: "Summarises every symbol on the plan in one call with hourly and daily change. Use when the user asks how the market is doing overall or wants a cross-asset overview."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: market-data
  role: "Market data analyst"
---

# Market Snapshot

Summarises every symbol on the plan in one call with hourly and daily change. Use when the user asks how the market is doing overall or wants a cross-asset overview.

## Example requests

- "How are markets today?"
- "Give me a snapshot of everything."

## Data sources

- `GET /api/v1/price/market`

## Workflow

1. Call `GET /api/v1/price/market` once; do not loop over symbols.
2. Group the results by market class: metals, forex, crypto, commodities, indices, stocks.
3. For each group report the average daily change and the strongest and weakest symbol.
4. Close with one line on the overall tone, for example dollar firm, risk assets soft.

## Output

- A grouped table of symbol, price, hourly and daily change.
- A one-line market tone.

## Avoid

- Listing all 60 symbols without grouping.
- Calling `get_price` per symbol instead of the batch route.

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
