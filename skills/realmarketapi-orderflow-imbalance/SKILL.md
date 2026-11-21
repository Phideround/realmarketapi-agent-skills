---
name: realmarketapi-orderflow-imbalance
description: "Reads bullish versus bearish candle dominance and imbalance zones. Use when the user asks who is in control, buyers or sellers, or wants order-flow confirmation."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: market-structure
  role: "Market structure analyst"
---

# Order Flow Imbalance

Reads bullish versus bearish candle dominance and imbalance zones. Use when the user asks who is in control, buyers or sellers, or wants order-flow confirmation.

## Example requests

- "Who is in control of gold right now?"
- "Order flow on BTCUSD M15?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_orderflow_imbalance` | `GET /api/v1/orderflow/imbalance` |

REST and WebSocket only (no MCP tool):

- `wss://api.realmarketapi.com/orderflow/imbalance`

## Workflow

1. Call `get_orderflow_imbalance`; on Pro or above, stream `/orderflow/imbalance` for live updates.
2. Report dominance side and its strength.
3. List imbalance zones and whether price has revisited them.
4. Compare dominance with the price trend: agreement confirms, disagreement warns.

## Output

- Dominant side, strength and the open imbalance zones.
- Confirmation or warning against the current trend.

## Avoid

- Describing this as exchange order-book data; it is derived from candles.
- Acting on a single-bar flip.

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
