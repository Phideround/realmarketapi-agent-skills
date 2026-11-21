---
name: realmarketapi-websocket-integration
description: "Implements a resilient WebSocket client for the price, candles, market, multi-timeframe and order-flow streams. Use when building live-updating features."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: developer-integration
  role: "Coding agent"
---

# WebSocket Integration

Implements a resilient WebSocket client for the price, candles, market, multi-timeframe and order-flow streams. Use when building live-updating features.

## Example requests

- "Stream live gold prices into my React app."
- "Build a reconnecting WebSocket client in Python."

## Data sources

- `wss://api.realmarketapi.com/price`
- `wss://api.realmarketapi.com/candles`
- `wss://api.realmarketapi.com/market`
- `wss://api.realmarketapi.com/multi-timeframe`
- `wss://api.realmarketapi.com/orderflow/imbalance`

## Workflow

1. Connect to `wss://api.realmarketapi.com/<stream>` with `apiKey`, `symbolCode` and `timeFrame` in the query string.
2. Reconnect with exponential backoff and jitter, capped at about 30 seconds; reset the delay after a stable connection.
3. Detect silent stalls with a heartbeat timeout and reconnect.
4. Stay within `webSocketConcurrentLimit`; use `/market` for many symbols.
5. Proxy the stream through your server for browser clients so the key stays private.

## Output

- A client with connect, reconnect, heartbeat and clean shutdown.
- A note on the connection limit for the plan.

## Avoid

- Reconnecting in a tight loop.
- One socket per symbol.

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
