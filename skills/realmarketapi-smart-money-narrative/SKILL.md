---
name: realmarketapi-smart-money-narrative
description: "Combines structure, liquidity, imbalances and order flow into one coherent story of what price is doing and where it is drawn next. Use when the user asks for an ICT or SMC style read."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: market-structure
  role: "Market structure analyst"
---

# Smart Money Narrative

Combines structure, liquidity, imbalances and order flow into one coherent story of what price is doing and where it is drawn next. Use when the user asks for an ICT or SMC style read.

## Example requests

- "SMC read on XAUUSD."
- "What is smart money doing on BTC?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_multi_timeframe` | `GET /api/v1/multi-timeframe` |
| `get_liquidity_zones` | `GET /api/v1/liquidity/zones` |
| `get_stop_hunt_zones` | `GET /api/v1/stop-hunt/zones` |
| `get_orderflow_imbalance` | `GET /api/v1/orderflow/imbalance` |
| `get_candles` | `GET /api/v1/candle` |

## Workflow

1. Set the higher-timeframe bias with `get_multi_timeframe`.
2. Name the liquidity already taken and the liquidity still resting from `get_liquidity_zones` and `get_stop_hunt_zones`.
3. Find the latest displacement and the gap or block it left in `get_candles`.
4. Write the story: bias, what was swept, where price is likely to rebalance, then the draw.

## Output

- A five to seven line narrative with levels.
- The scenario that invalidates it.

## Avoid

- Jargon without levels.
- Presenting one narrative as certain; give the alternative.

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
