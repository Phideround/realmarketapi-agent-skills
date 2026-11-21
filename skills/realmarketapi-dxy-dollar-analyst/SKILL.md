---
name: realmarketapi-dxy-dollar-analyst
description: "Analyses the US dollar index and what it implies for forex, gold and risk assets. Use when the user asks about the dollar or needs a dollar view before another trade."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: asset-specialists
  role: "Asset-class specialist"
---

# Dollar Index Analyst

Analyses the US dollar index and what it implies for forex, gold and risk assets. Use when the user asks about the dollar or needs a dollar view before another trade.

## Example requests

- "Where is the dollar heading?"
- "What does DXY mean for gold today?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_price` | `GET /api/v1/price` |
| `get_multi_timeframe` | `GET /api/v1/multi-timeframe` |
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |
| `get_insight_trend` | `GET /api/v1/insight/trend` |

## Workflow

1. Analyse DXY with `get_multi_timeframe` and `get_support_resistance`.
2. State the dollar bias and the level that would change it.
3. Translate it: firm dollar pressures EURUSD, GBPUSD, AUDUSD and gold; supports USDJPY and USDCAD.
4. Flag any symbol that is ignoring the dollar move as relative strength or weakness.

## Output

- Dollar bias with levels and the implication per major asset.
- Symbols diverging from the dollar.

## Avoid

- Treating the gold-dollar link as fixed.
- Forgetting that DXY is mostly euro and yen.

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
