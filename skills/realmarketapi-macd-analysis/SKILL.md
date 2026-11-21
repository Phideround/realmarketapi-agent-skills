---
name: realmarketapi-macd-analysis
description: "Interprets MACD line, signal line and histogram for momentum shifts. Use when the user asks about MACD, momentum turning or a crossover signal."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: technical-analysis
  role: "Technical analyst"
---

# MACD Analysis

Interprets MACD line, signal line and histogram for momentum shifts. Use when the user asks about MACD, momentum turning or a crossover signal.

## Example requests

- "MACD on EURUSD H1?"
- "Is momentum fading on NVDA?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_macd` | `GET /api/v1/indicator/macd` |

## Workflow

1. Call `get_macd` with defaults 12, 26, 9.
2. Report the MACD line against the signal line, and both against zero.
3. Read the histogram trend over the last five bars: expanding or contracting.
4. Note the last signal crossover and whether it happened above or below zero.

## Output

- MACD state: bullish or bearish, strengthening or fading.
- Bars since the last crossover.

## Avoid

- Treating a crossover far from zero the same as one near zero.
- Using MACD alone in a range.

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
