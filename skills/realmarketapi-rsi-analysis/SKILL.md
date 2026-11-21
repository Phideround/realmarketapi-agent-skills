---
name: realmarketapi-rsi-analysis
description: "Interprets the Relative Strength Index for momentum, overbought and oversold conditions and regime. Use when the user asks about RSI or whether a symbol is overbought or oversold."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: technical-analysis
  role: "Technical analyst"
---

# RSI Analysis

Interprets the Relative Strength Index for momentum, overbought and oversold conditions and regime. Use when the user asks about RSI or whether a symbol is overbought or oversold.

## Example requests

- "Is gold overbought?"
- "RSI on BTCUSD H4?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_rsi` | `GET /api/v1/indicator/rsi` |
| `get_candles` | `GET /api/v1/candle` |

## Workflow

1. Call `get_rsi` with period 14 unless told otherwise and read the latest closed value and the last 20.
2. Classify: above 70 overbought, below 30 oversold, 40 to 60 neutral.
3. Apply the regime rule: in uptrends RSI tends to hold 40 to 80, in downtrends 20 to 60.
4. Check for divergence against the last two swing points in price.

## Output

- RSI value, zone, regime and any divergence.
- What the reading means in this trend context.

## Avoid

- Selling only because RSI is above 70 in a strong uptrend.
- Reading the unfinished candle's RSI as final.

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
