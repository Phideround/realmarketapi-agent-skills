---
name: realmarketapi-momentum-strategy
description: "Buys strength and sells weakness when momentum, trend strength and order flow agree. Use when the user asks about a fast move and whether to trade in its direction."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: trading-strategies
  role: "Trader"
---

# Momentum Strategy

Buys strength and sells weakness when momentum, trend strength and order flow agree. Use when the user asks about a fast move and whether to trade in its direction.

## Example requests

- "Should I chase this ETH move?"
- "Momentum play on TSLA?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_macd` | `GET /api/v1/indicator/macd` |
| `get_rsi` | `GET /api/v1/indicator/rsi` |
| `get_adx` | `GET /api/v1/indicator/adx` |
| `get_orderflow_imbalance` | `GET /api/v1/orderflow/imbalance` |
| `get_anomaly` | `GET /api/v1/anomaly` |

## Workflow

1. Require MACD above signal and above zero, RSI between 55 and 75, ADX rising.
2. Confirm dominance with `get_orderflow_imbalance`.
3. Reject the trade if `get_anomaly` flags the latest bar as a spike.
4. Enter on a shallow pause; stop under the pause low; exit when the MACD histogram shrinks for three bars.

## Output

- Momentum checklist result, entry, stop and exit rule.
- How late the move is.

## Avoid

- Chasing a vertical candle.
- Holding after momentum fades.

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
