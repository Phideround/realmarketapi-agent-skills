---
name: realmarketapi-pivot-points
description: "Calculates classic daily pivot levels from the previous day's candle. Use when the user asks for pivots, daily levels or intraday reference points."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: technical-analysis
  role: "Technical analyst"
---

# Pivot Points

Calculates classic daily pivot levels from the previous day's candle. Use when the user asks for pivots, daily levels or intraday reference points.

## Example requests

- "Daily pivots for EURUSD?"
- "Where is the pivot on US30 today?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_history` | `GET /api/v1/history` |
| `get_price` | `GET /api/v1/price` |

## Workflow

1. Fetch the last closed D1 candle with `get_history`.
2. Compute P as (high + low + close) / 3, R1 as 2P - low, S1 as 2P - high, R2 as P + (high - low), S2 as P - (high - low).
3. Place current price relative to P and the nearest level.

## Output

- P, R1, R2, S1, S2 and where price sits.
- The date of the candle used.

## Avoid

- Using the unfinished daily candle.
- Presenting calculated pivots as API-provided levels.

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
