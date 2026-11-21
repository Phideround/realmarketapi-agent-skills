---
name: realmarketapi-trend-following-strategy
description: "Rides established trends with moving-average alignment and an ATR trailing stop. Use when the user wants a systematic way to stay with a trend."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: trading-strategies
  role: "Trader"
---

# Trend Following Strategy

Rides established trends with moving-average alignment and an ATR trailing stop. Use when the user wants a systematic way to stay with a trend.

## Example requests

- "Trend following setup for gold."
- "How do I stay in this NVDA trend?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_ema` | `GET /api/v1/indicator/ema` |
| `get_adx` | `GET /api/v1/indicator/adx` |
| `get_atr` | `GET /api/v1/indicator/atr` |
| `get_multi_timeframe` | `GET /api/v1/multi-timeframe` |

## Workflow

1. Require EMA 20 above 50 above 200 for longs, with ADX above 25.
2. Confirm the next higher timeframe agrees via `get_multi_timeframe`.
3. Enter on a close above the prior swing or on a pullback to EMA 20.
4. Trail the stop 3 ATR from the extreme; exit on a close through EMA 50.

## Output

- Entry condition, initial stop, trail rule and exit rule.
- Current status: in trend, waiting or out.

## Avoid

- Taking profit early and missing the trend the system exists to catch.
- Running it in an ADX below 20 market.

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
