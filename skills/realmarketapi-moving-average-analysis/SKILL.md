---
name: realmarketapi-moving-average-analysis
description: "Reads SMA, EMA and WMA values, their slopes, stacking and crossovers. Use when the user asks about moving averages, crossovers or dynamic support and resistance."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: technical-analysis
  role: "Technical analyst"
---

# Moving Average Analysis

Reads SMA, EMA and WMA values, their slopes, stacking and crossovers. Use when the user asks about moving averages, crossovers or dynamic support and resistance.

## Example requests

- "Where is the 200 SMA on US500?"
- "Did the 20 and 50 EMA cross on ETHUSD?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_sma` | `GET /api/v1/indicator/sma` |
| `get_ema` | `GET /api/v1/indicator/ema` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/indicator/wma`

## Workflow

1. Fetch the averages asked for; default to EMA 20 and 50 plus SMA 200.
2. Report price above or below each, the slope of each, and the stacking order.
3. Find the most recent crossover and how many bars ago it happened.
4. Name the average that has acted as support or resistance on recent pullbacks.

## Output

- Values, slopes, alignment and the last crossover.
- The dynamic level to watch.

## Avoid

- Trading crossovers in a flat, ranging market.
- Mixing periods from different timeframes without saying so.

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
