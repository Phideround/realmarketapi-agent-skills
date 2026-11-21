---
name: realmarketapi-volume-analysis
description: "Compares current volume with its recent average and relates it to price movement. Use when the user asks whether a move has participation behind it or wants relative volume."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: market-data
  role: "Market data analyst"
---

# Volume Analysis

Compares current volume with its recent average and relates it to price movement. Use when the user asks whether a move has participation behind it or wants relative volume.

## Example requests

- "Is this breakout on real volume?"
- "Relative volume on TSLA H1?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_candles` | `GET /api/v1/candle` |

## Workflow

1. Call `get_candles` and compute the 20-bar average volume.
2. Compute relative volume for the last closed bar as volume divided by that average.
3. Classify bars: wide range with high volume is conviction, wide range with low volume is suspect, narrow range with high volume is absorption.
4. Note that forex and CFD volume is tick or provider volume, not exchange volume.

## Output

- Relative volume, the classification and what it implies for the move.
- The caveat on volume source for that asset class.

## Avoid

- Comparing volume across symbols.
- Using the unfinished bar's volume as if it were complete.

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
