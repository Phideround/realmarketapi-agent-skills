---
name: realmarketapi-trend-identification
description: "Determines direction and strength of the trend on one timeframe. Use when the user asks whether a symbol is trending, which way, or how strongly."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: technical-analysis
  role: "Technical analyst"
---

# Trend Identification

Determines direction and strength of the trend on one timeframe. Use when the user asks whether a symbol is trending, which way, or how strongly.

## Example requests

- "Is bitcoin trending?"
- "What is the trend on GBPJPY H4?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_ema` | `GET /api/v1/indicator/ema` |
| `get_adx` | `GET /api/v1/indicator/adx` |
| `get_insight_trend` | `GET /api/v1/insight/trend` |

## Workflow

1. Compare price with `get_ema` 20, 50 and 200 and check their order.
2. Read `get_adx`: above 25 is a trend, below 20 is no trend; +DI above -DI is up.
3. Cross-check with `get_insight_trend` (StrongUptrend to StrongDowntrend).
4. Report direction, strength and how extended price is from the 20 EMA in ATR terms.

## Output

- Direction, strength and stage (early, mature, extended).
- The level that would break the trend.

## Avoid

- Calling a trend from one moving average.
- Ignoring an ADX below 20.

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
