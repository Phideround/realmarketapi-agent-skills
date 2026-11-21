---
name: realmarketapi-support-resistance-mapping
description: "Maps the nearest support and resistance levels around current price and ranks them. Use when the user asks for key levels, where price may react, or where to set alerts."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: technical-analysis
  role: "Technical analyst"
---

# Support and Resistance Mapping

Maps the nearest support and resistance levels around current price and ranks them. Use when the user asks for key levels, where price may react, or where to set alerts.

## Example requests

- "Key levels on EURUSD today?"
- "Where is support on NVDA?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |
| `get_price` | `GET /api/v1/price` |
| `get_liquidity_zones` | `GET /api/v1/liquidity/zones` |

## Workflow

1. Call `get_support_resistance` on the execution timeframe and one timeframe higher.
2. Merge levels closer together than about 0.25 ATR into zones.
3. Rank zones: higher-timeframe levels and levels matching `get_liquidity_zones` rank highest.
4. Report distance from current price to each zone in price and percent.

## Output

- Two or three support and resistance zones above and below price, ranked.
- The first zone on each side and its distance.

## Avoid

- Listing ten levels of equal weight.
- Treating a level as an exact price instead of a zone.

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
