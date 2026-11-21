---
name: realmarketapi-williams-r-analysis
description: "Interprets Williams %R for overbought and oversold timing. Use when the user asks about Williams %R or wants a fast oscillator for entries."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: technical-analysis
  role: "Technical analyst"
---

# Williams %R Analysis

Interprets Williams %R for overbought and oversold timing. Use when the user asks about Williams %R or wants a fast oscillator for entries.

## Example requests

- "Williams %R on BTCUSD M15?"
- "Is AAPL overbought on %R?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_williams_r` | `GET /api/v1/indicator/williams-r` |

## Workflow

1. Call `get_williams_r` with period 14.
2. Read zones: 0 to -20 overbought, -80 to -100 oversold.
3. Look for a failure swing: a move out of the extreme that does not return on the next push.

## Output

- %R value, zone and whether it is leaving an extreme.
- Timing implication.

## Avoid

- Reading -20 as oversold; the scale is inverted.
- Using it without a trend filter.

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
