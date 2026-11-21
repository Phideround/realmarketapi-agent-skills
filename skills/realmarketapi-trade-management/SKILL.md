---
name: realmarketapi-trade-management
description: "Reviews an open position against live data and recommends hold, reduce, trail or exit. Use when the user is in a trade and asks what to do now."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: trading-strategies
  role: "Trader"
---

# Trade Management

Reviews an open position against live data and recommends hold, reduce, trail or exit. Use when the user is in a trade and asks what to do now.

## Example requests

- "I am long gold from 2,630, what now?"
- "Should I close my BTC short?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_price` | `GET /api/v1/price` |
| `get_atr` | `GET /api/v1/indicator/atr` |
| `get_insight_next` | `GET /api/v1/insight/next` |
| `get_orderflow_imbalance` | `GET /api/v1/orderflow/imbalance` |
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |

## Workflow

1. Take entry, stop, target and direction; compute open profit in multiples of risk.
2. Check whether the original thesis still holds: structure, trend and order flow.
3. Apply rules: at 1R move the stop to break-even, at the first target take partials, and trail the rest by ATR.
4. If the thesis is broken, recommend exit regardless of profit or loss.

## Output

- Open result in R, thesis status and one clear recommendation.
- The new stop if one is advised.

## Avoid

- Recommending to widen a stop.
- Letting open profit or loss decide instead of the thesis.

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
