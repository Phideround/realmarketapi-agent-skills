---
name: realmarketapi-silver-specialist
description: "Analyses silver and its relationship to gold through the gold-silver ratio. Use when the symbol is XAGUSD or the user asks about silver or the ratio."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: asset-specialists
  role: "Asset-class specialist"
---

# XAGUSD Silver Specialist

Analyses silver and its relationship to gold through the gold-silver ratio. Use when the symbol is XAGUSD or the user asks about silver or the ratio.

## Example requests

- "How is silver looking?"
- "What is the gold-silver ratio?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_price` | `GET /api/v1/price` |
| `get_history` | `GET /api/v1/history` |
| `get_atr` | `GET /api/v1/indicator/atr` |
| `get_insight_trend` | `GET /api/v1/insight/trend` |

## Workflow

1. Fetch XAGUSD and XAUUSD prices and compute the ratio.
2. Compare the ratio with its range over the available D1 history.
3. Read silver's own trend and ATR; silver moves roughly twice gold's percentage on the same day.
4. Say whether silver is leading or lagging gold.

## Output

- Silver bias, the ratio and where it sits in its range.
- Lead or lag versus gold.

## Avoid

- Sizing silver like gold.
- Trading the ratio as if it must revert on a schedule.

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
