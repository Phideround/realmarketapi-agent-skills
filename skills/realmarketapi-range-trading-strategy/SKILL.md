---
name: realmarketapi-range-trading-strategy
description: "Fades the edges of a defined range while trend strength is low. Use when a symbol is moving sideways and the user asks how to trade it."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: trading-strategies
  role: "Trader"
---

# Range Trading Strategy

Fades the edges of a defined range while trend strength is low. Use when a symbol is moving sideways and the user asks how to trade it.

## Example requests

- "EURUSD is going sideways, how do I trade it?"
- "Range levels on XAGUSD?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_insight_setup` | `GET /api/v1/insight/setup` |
| `get_adx` | `GET /api/v1/indicator/adx` |
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |
| `get_stochastic` | `GET /api/v1/indicator/stochastic` |
| `get_atr` | `GET /api/v1/indicator/atr` |

## Workflow

1. Confirm a Range setup with `get_insight_setup` and ADX below 20.
2. Define the range from `get_support_resistance`; it should be at least 3 ATR tall.
3. At the edge, wait for a Stochastic turn from the extreme zone.
4. Stop 0.5 to 1 ATR outside the range; target the midpoint, then the opposite edge.

## Output

- Range bounds, entry edge, trigger, stop and targets.
- The close outside the range that ends the strategy.

## Avoid

- Fading a range with rising ADX.
- Trading the middle of the range.

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
