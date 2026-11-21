---
name: realmarketapi-data-freshness-check
description: "Verifies that returned prices are current by comparing candle timestamps with the clock and the market schedule. Use before quoting a live price, after a weekend or holiday, or when numbers look stale."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: foundations
  role: "Any agent"
---

# Data Freshness Check

Verifies that returned prices are current by comparing candle timestamps with the clock and the market schedule. Use before quoting a live price, after a weekend or holiday, or when numbers look stale.

## Example requests

- "Is this gold price live?"
- "Why has the EURUSD price not moved?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_price` | `GET /api/v1/price` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/market-calendar`

## Workflow

1. Call `get_price` and compare `openTime` with the current UTC time for that timeframe.
2. If the latest candle is more than two periods old, call `GET /api/v1/market-calendar` to see whether the market is closed.
3. Label the data as live, closed-market last price, or stale.
4. For stale data on an open market, retry once, then report it rather than analysing it as live.

## Output

- Freshness label, candle time in UTC and its age.
- Market session status.

## Avoid

- Calling a Friday close a live price on Saturday.
- Treating crypto like a market that closes at weekends.

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
