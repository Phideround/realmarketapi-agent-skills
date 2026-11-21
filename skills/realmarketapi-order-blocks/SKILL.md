---
name: realmarketapi-order-blocks
description: "Locates the last opposing candle before a strong displacement move as a potential reaction zone. Use when the user asks about order blocks or institutional entry zones."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: market-structure
  role: "Market structure analyst"
---

# Order Blocks

Locates the last opposing candle before a strong displacement move as a potential reaction zone. Use when the user asks about order blocks or institutional entry zones.

## Example requests

- "Order blocks on GBPUSD H1?"
- "Where is the bullish order block on gold?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_candles` | `GET /api/v1/candle` |
| `get_liquidity_zones` | `GET /api/v1/liquidity/zones` |
| `get_atr` | `GET /api/v1/indicator/atr` |

## Workflow

1. Find displacement moves: candles with a range above 1.5 ATR that break a swing.
2. Mark the last opposite-coloured candle before each as the order block, using its full range.
3. Keep blocks that have not been traded through, and rank those overlapping `get_liquidity_zones` higher.

## Output

- Order block zones with direction, time and whether they are untested.
- The first untested block on each side.

## Avoid

- Marking a block without a displacement and a structure break.
- Calling this confirmed institutional activity; it is a price-action model.

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
