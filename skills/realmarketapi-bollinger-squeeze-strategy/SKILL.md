---
name: realmarketapi-bollinger-squeeze-strategy
description: "Trades the volatility expansion that follows a Bollinger Band squeeze. Use when bands are unusually narrow and the user asks how to position for the move."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: trading-strategies
  role: "Trader"
---

# Bollinger Squeeze Strategy

Trades the volatility expansion that follows a Bollinger Band squeeze. Use when bands are unusually narrow and the user asks how to position for the move.

## Example requests

- "Squeeze trade on gold H1?"
- "Is EURUSD about to expand?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_bollinger_bands` | `GET /api/v1/indicator/bollinger-bands` |
| `get_volatility` | `GET /api/v1/volatility` |
| `get_macd` | `GET /api/v1/indicator/macd` |
| `get_candles` | `GET /api/v1/candle` |

## Workflow

1. Confirm a squeeze: band width near its lowest of the last 100 bars in `get_volatility`.
2. Wait for a close outside a band with range expansion.
3. Take the direction of the break, confirmed by MACD on the same side of zero.
4. Stop at the middle band; trail along it as the bands open.

## Output

- Squeeze status, break direction, entry, stop and trail.
- Bars the squeeze has lasted.

## Avoid

- Guessing direction before the break.
- Staying in once price closes back inside the middle band.

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
