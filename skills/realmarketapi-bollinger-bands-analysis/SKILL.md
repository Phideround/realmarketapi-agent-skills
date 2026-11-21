---
name: realmarketapi-bollinger-bands-analysis
description: "Reads Bollinger Bands for volatility state, squeezes and band position. Use when the user asks about Bollinger Bands, a squeeze or whether price is stretched."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: technical-analysis
  role: "Technical analyst"
---

# Bollinger Bands Analysis

Reads Bollinger Bands for volatility state, squeezes and band position. Use when the user asks about Bollinger Bands, a squeeze or whether price is stretched.

## Example requests

- "Is there a Bollinger squeeze on XAUUSD?"
- "Where is price in the bands on USDJPY?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_bollinger_bands` | `GET /api/v1/indicator/bollinger-bands` |
| `get_candles` | `GET /api/v1/candle` |

## Workflow

1. Call `get_bollinger_bands` with defaults 20 and 2.
2. Compute band width as upper minus lower over middle and compare it with its recent range.
3. Locate price: outside a band, riding a band, or returning to the middle.
4. Flag a squeeze when width sits near its lowest of the last hundred bars.

## Output

- Band values, width state (squeeze, normal, expanded) and price position.
- The implication: expansion likely, trend ride or reversion.

## Avoid

- Assuming a touch of the band is a reversal signal.
- Predicting breakout direction from the squeeze alone.

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
