---
name: realmarketapi-crypto-market-breadth
description: "Measures how broad a crypto move is across all covered coins. Use when the user asks whether the whole crypto market is moving or only bitcoin."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: asset-specialists
  role: "Asset-class specialist"
---

# Crypto Market Breadth

Measures how broad a crypto move is across all covered coins. Use when the user asks whether the whole crypto market is moving or only bitcoin.

## Example requests

- "Is the whole crypto market up?"
- "Is this an alt season move?"

## Data sources

- `GET /api/v1/price/category`
- `GET /api/v1/price/24hr`

## Workflow

1. Call `GET /api/v1/price/category` for Crypto.
2. Count coins up versus down and compute the average and median change.
3. Compare bitcoin's change with the median altcoin.
4. Label: broad rally, bitcoin-led, altcoin-led, or broad sell-off.

## Output

- Advance and decline count, average change and the breadth label.
- Leaders and laggards.

## Avoid

- Calling it market-wide from two coins.
- Presenting nine coins as the entire crypto market.

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
