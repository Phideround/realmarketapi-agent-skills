---
name: realmarketapi-gap-detector
description: "Finds price gaps between one candle's close and the next open, including weekend gaps. Use when the user asks about gaps, weekend opens or unfilled gaps."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: market-data
  role: "Market data analyst"
---

# Gap Detector

Finds price gaps between one candle's close and the next open, including weekend gaps. Use when the user asks about gaps, weekend opens or unfilled gaps.

## Example requests

- "Any unfilled gaps on US500?"
- "Did EURUSD gap at the weekly open?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_history` | `GET /api/v1/history` |
| `get_candles` | `GET /api/v1/candle` |

## Workflow

1. Pull D1 or H1 candles for the window.
2. Flag a gap when the open differs from the previous close by more than about 0.25 of the ATR for that timeframe.
3. Mark each gap as filled once later price trades back through the prior close.

## Output

- A list of gaps with date, size, direction and filled or open status.
- The nearest unfilled gap to current price.

## Avoid

- Treating every gap as certain to fill.
- Looking for weekend gaps on crypto.

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
