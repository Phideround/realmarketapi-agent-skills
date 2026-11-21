---
name: realmarketapi-javascript-sdk
description: "Uses the realmarketapi-js-sdk-beta npm package from Node.js. Use when integrating from JavaScript or TypeScript on the server."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: developer-integration
  role: "Coding agent"
---

# JavaScript and TypeScript SDK

Uses the realmarketapi-js-sdk-beta npm package from Node.js. Use when integrating from JavaScript or TypeScript on the server.

## Example requests

- "Fetch candles with the JS SDK."
- "TypeScript example for live prices."

## Data sources

- `GET /api/v1/price`
- `GET /api/v1/candle`
- `wss://api.realmarketapi.com/price`

## Workflow

1. Install with `npm install realmarketapi-js-sdk-beta@beta` on Node.js 20 or later.
2. Create `new RealMarketApiClient({ ... })` with the key from `process.env` and call methods such as `client.getPrice(symbol, timeFrame)` and `client.getSymbols()`.
3. Use `RealMarketApiWebSocket` for streams.
4. The beta SDK covers a subset of the API; call REST directly for routes it lacks, and check the README for the current list.

## Output

- Client setup and one REST plus one WebSocket example.
- A note on which calls fall back to REST.

## Avoid

- Importing the SDK into browser bundles with a key.
- Assuming full API coverage in the beta.

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
