---
name: realmarketapi-liquidity-zones
description: "Maps clusters of resting liquidity above and below price. Use when the user asks where liquidity sits, where price is likely to be drawn, or for liquidity-based targets."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: market-structure
  role: "Market structure analyst"
---

# Liquidity Zones

Maps clusters of resting liquidity above and below price. Use when the user asks where liquidity sits, where price is likely to be drawn, or for liquidity-based targets.

## Example requests

- "Where is the liquidity on XAUUSD?"
- "Liquidity zones for BTC H1."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_liquidity_zones` | `GET /api/v1/liquidity/zones` |
| `get_price` | `GET /api/v1/price` |

## Workflow

1. Call `get_liquidity_zones` on the execution timeframe and one higher.
2. Sort zones by distance from current price and split them into above and below.
3. Mark higher-timeframe zones and zones tested several times as stronger.
4. State the nearest draw on each side.

## Output

- Zone table: range, side, strength, distance.
- The most likely near-term draw.

## Avoid

- Treating a zone as a guaranteed reversal point.
- Listing far-away zones for an intraday question.

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
