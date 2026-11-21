---
name: realmarketapi-commodities-specialist
description: "Analyses natural gas, platinum and copper. Use when the user asks about XNGUSD, XPTUSD or XCUUSD."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: asset-specialists
  role: "Asset-class specialist"
---

# Commodities Specialist

Analyses natural gas, platinum and copper. Use when the user asks about XNGUSD, XPTUSD or XCUUSD.

## Example requests

- "Natural gas analysis."
- "Is copper confirming the equity rally?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_price` | `GET /api/v1/price` |
| `get_insight_trend` | `GET /api/v1/insight/trend` |
| `get_atr` | `GET /api/v1/indicator/atr` |
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |

## Workflow

1. Analyse the symbol's trend and levels.
2. Apply the instrument's character: natural gas is highly volatile and seasonal, copper tracks growth sentiment, platinum follows gold loosely.
3. Compare copper with equity indices and platinum with gold for confirmation.
4. Size from ATR percent rather than habit.

## Output

- Bias, levels, volatility and the related-market check.
- Sizing note.

## Avoid

- Treating natural gas like a metal.
- Assuming tight liquidity outside main hours.

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
