---
name: realmarketapi-websocket-price-monitor
description: "Watches live prices over the WebSocket stream instead of polling. Use when the user needs continuous live updates for one or more symbols on Plus or above."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: alerts-monitoring
  role: "Monitoring agent"
---

# WebSocket Price Monitor

Watches live prices over the WebSocket stream instead of polling. Use when the user needs continuous live updates for one or more symbols on Plus or above.

## Example requests

- "Watch gold live and tell me if it breaks 2,680."
- "Stream BTC and ETH prices."

## Data sources

- `wss://api.realmarketapi.com/price`
- `wss://api.realmarketapi.com/market`
- `GET /api/v1/me`

## Workflow

1. Check `isSocketSupport` and `webSocketConcurrentLimit` with `GET /api/v1/me`.
2. Use `/price` for one symbol or `/market` for everything on the plan; do not open one socket per symbol.
3. Reconnect with exponential backoff and re-subscribe after a drop.
4. Throttle what is reported to the user: on level crosses or every N seconds, not on every tick.

## Output

- Connection status and the conditions being watched.
- A concise event when a condition triggers.

## Avoid

- Polling REST every second.
- Exceeding the concurrent connection limit.

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
