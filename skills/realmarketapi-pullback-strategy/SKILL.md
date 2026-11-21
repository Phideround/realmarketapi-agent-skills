---
name: realmarketapi-pullback-strategy
description: "Enters an established trend on a retracement to value. Use when a symbol is trending and the user asks where to join it."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: trading-strategies
  role: "Trader"
---

# Pullback Strategy

Enters an established trend on a retracement to value. Use when a symbol is trending and the user asks where to join it.

## Example requests

- "Where can I join the gold uptrend?"
- "Pullback entry on USDJPY?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_insight_trend` | `GET /api/v1/insight/trend` |
| `get_ema` | `GET /api/v1/indicator/ema` |
| `get_fibonacci` | `GET /api/v1/indicator/fibonacci` |
| `get_rsi` | `GET /api/v1/indicator/rsi` |
| `get_atr` | `GET /api/v1/indicator/atr` |

## Workflow

1. Confirm the trend with `get_insight_trend` and EMA 20 above EMA 50 (or below for shorts).
2. Define the value zone: between EMA 20 and EMA 50, overlapping the 38.2 to 61.8 retracement.
3. Wait for RSI to reset toward 40 to 50 in an uptrend, 50 to 60 in a downtrend.
4. Enter on a rejection candle from the zone; stop beyond the zone plus 0.5 ATR; target the prior extreme first.

## Output

- Trend, value zone, trigger, stop and targets.
- The depth of pullback that invalidates the trend.

## Avoid

- Buying the first red candle.
- Calling a reversal a pullback after structure has broken.

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
