---
name: realmarketapi-candlestick-patterns
description: "Detects common candlestick patterns in recent closed candles and rates them by location. Use when the user asks about candle patterns or a reversal or continuation signal on the latest bars."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: technical-analysis
  role: "Technical analyst"
---

# Candlestick Patterns

Detects common candlestick patterns in recent closed candles and rates them by location. Use when the user asks about candle patterns or a reversal or continuation signal on the latest bars.

## Example requests

- "Any candle patterns on EURUSD H4?"
- "Did gold print a pin bar?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_candles` | `GET /api/v1/candle` |
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |

## Workflow

1. Call `get_candles` and examine the last five closed bars.
2. Test for engulfing, pin bar or hammer, shooting star, doji, inside bar, morning and evening star using body and wick ratios.
3. Rate a pattern as meaningful only at a support or resistance zone and in line with or clearly rejecting the trend.

## Output

- Patterns found, the bar time and the rating by location.
- The price that confirms or voids each pattern.

## Avoid

- Naming patterns on the unfinished candle.
- Treating a mid-range pattern as a signal.

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
