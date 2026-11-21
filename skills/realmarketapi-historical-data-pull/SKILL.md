---
name: realmarketapi-historical-data-pull
description: "Downloads paged historical candles for a date range and returns a clean, ordered dataset. Use when the user needs past data for charts, research, backtests or exports."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: market-data
  role: "Market data analyst"
---

# Historical Data Pull

Downloads paged historical candles for a date range and returns a clean, ordered dataset. Use when the user needs past data for charts, research, backtests or exports.

## Example requests

- "Download six months of XAUUSD H1 candles."
- "Get BTCUSD daily data for 2025 as CSV."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_history` | `GET /api/v1/history` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/me`

## Workflow

1. Read `historicalRangeMonth` from `GET /api/v1/me` and clamp the requested range to it.
2. Call `get_history` with `startTime`, `endTime` and `pageSize` 1000, then page until `currentPage` equals `totalPages`.
3. Sort ascending by `openTime`, drop duplicates and report gaps longer than expected for the timeframe.
4. Return the row count, the first and last timestamp, and the data in the requested format.

## Output

- Dataset summary: rows, range, gaps found.
- Data as CSV or JSON with columns openTime, open, high, low, close, volume.

## Avoid

- Requesting more history than the plan allows.
- Using page size 20 for a year of M5 data.

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
