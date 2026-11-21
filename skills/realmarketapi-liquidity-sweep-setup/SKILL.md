---
name: realmarketapi-liquidity-sweep-setup
description: "Detects a sweep of a stop-hunt zone followed by a reclaim of the level. Use when the user asks about a sweep entry, a fake breakout or a stop-run reversal."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: market-structure
  role: "Market structure analyst"
---

# Liquidity Sweep Setup

Detects a sweep of a stop-hunt zone followed by a reclaim of the level. Use when the user asks about a sweep entry, a fake breakout or a stop-run reversal.

## Example requests

- "Did gold sweep the lows?"
- "Is this EURUSD breakout a stop hunt?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_stop_hunt_zones` | `GET /api/v1/stop-hunt/zones` |
| `get_candles` | `GET /api/v1/candle` |
| `get_orderflow_imbalance` | `GET /api/v1/orderflow/imbalance` |
| `get_manipulation_risk` | `GET /api/v1/manipulation-risk` |

## Workflow

1. Get zones from `get_stop_hunt_zones` and watch for a candle that trades into one.
2. Require a close back inside the prior range on the same or next candle.
3. Confirm with a dominance flip in `get_orderflow_imbalance`.
4. Entry on the reclaim, stop beyond the sweep extreme, first target the opposite side of the range.

## Output

- Whether a valid sweep and reclaim occurred, with levels.
- Entry, stop and first target if valid.

## Avoid

- Entering while price is still inside the zone.
- Ignoring a High manipulation-risk reading.

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
