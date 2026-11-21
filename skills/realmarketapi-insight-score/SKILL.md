---
name: realmarketapi-insight-score
description: "Reads the composite bullish or bearish score from 0 to 100 for a symbol. Use when the user wants one number for how bullish or bearish something is."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: signals-insight
  role: "Signal analyst"
---

# Insight Score

Reads the composite bullish or bearish score from 0 to 100 for a symbol. Use when the user wants one number for how bullish or bearish something is.

## Example requests

- "How bullish is gold?"
- "Insight score for NVDA H1."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_insight_score` | `GET /api/v1/insight/score` |

## Workflow

1. Call `get_insight_score` for the symbol and timeframe.
2. Interpret: above 65 bullish, below 35 bearish, between is mixed.
3. Fetch a second timeframe when the score is in the middle band.

## Output

- Score, label and the timeframe.
- A caution when the score is mixed.

## Avoid

- Reading 55 as a buy.
- Comparing scores across timeframes as if they measured the same thing.

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
