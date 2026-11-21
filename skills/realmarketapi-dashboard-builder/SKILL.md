---
name: realmarketapi-dashboard-builder
description: "Builds a market dashboard with a server-side proxy, live prices and charts. Use when the user asks for a web dashboard, ticker or chart page on RealMarketAPI data."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: developer-integration
  role: "Coding agent"
---

# Dashboard Builder

Builds a market dashboard with a server-side proxy, live prices and charts. Use when the user asks for a web dashboard, ticker or chart page on RealMarketAPI data.

## Example requests

- "Build a live gold and BTC dashboard in Next.js."
- "Make a price ticker for my site."

## Data sources

- `GET /api/v1/price/market`
- `GET /api/v1/candle`
- `wss://api.realmarketapi.com/market`

## Workflow

1. Put the API key on the server: a small proxy route for REST and a relay for WebSocket.
2. Load the initial state with `GET /api/v1/price/market`, then update from the `/market` stream or a slow poll on lower plans.
3. Render candles with a charting library, sorted ascending.
4. Show a stale-data indicator when updates stop, and a closed-market state.

## Output

- A working page with a price table, one chart and the proxy route.
- Plan-dependent behaviour documented in the README.

## Avoid

- Calling the API from the browser with the key.
- Polling every second on a metered plan.

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
