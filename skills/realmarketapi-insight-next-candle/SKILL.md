---
name: realmarketapi-insight-next-candle
description: "Reads the next-candle directional bias with its supporting indicators and levels. Use when the user asks what the next bar is likely to do or wants a short-horizon read."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: signals-insight
  role: "Signal analyst"
---

# Next-Candle Bias

Reads the next-candle directional bias with its supporting indicators and levels. Use when the user asks what the next bar is likely to do or wants a short-horizon read.

## Example requests

- "What will the next H1 candle do on BTC?"
- "Next-candle bias for XAUUSD M15."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_insight_next` | `GET /api/v1/insight/next` |

## Workflow

1. Call `get_insight_next` for the symbol and timeframe.
2. Report the bias, the supporting indicators and the key levels returned.
3. State the horizon explicitly: one candle of that timeframe.

## Output

- Bias for the next candle, supporting factors and levels.
- The time the current candle closes.

## Avoid

- Presenting a one-candle bias as a trend forecast.
- Stacking next-candle calls into a long forecast.

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
