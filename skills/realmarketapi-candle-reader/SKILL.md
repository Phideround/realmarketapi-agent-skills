---
name: realmarketapi-candle-reader
description: "Reads recent OHLCV candles and describes price action in plain language. Use when the user asks what price has been doing over the last few bars or sessions."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: market-data
  role: "Market data analyst"
---

# Candle Reader

Reads recent OHLCV candles and describes price action in plain language. Use when the user asks what price has been doing over the last few bars or sessions.

## Example requests

- "Walk me through the last 24 hours on EURUSD H1."
- "What has NVDA done this week?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_candles` | `GET /api/v1/candle` |

## Workflow

1. Call `get_candles` for the symbol and timeframe.
2. Find swing highs and lows, the sequence of higher or lower closes, and the largest candles by range.
3. Compare the latest candle's range and volume with the average of the previous twenty.
4. Describe it in order: direction, pace, notable bars, where the last close sits.

## Output

- A four to six line narrative of recent price action with levels.
- The most recent swing high and swing low.

## Avoid

- Reading meaning into the still-forming candle.
- Describing fifty candles one by one.

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
