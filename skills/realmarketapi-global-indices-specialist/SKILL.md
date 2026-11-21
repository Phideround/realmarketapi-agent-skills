---
name: realmarketapi-global-indices-specialist
description: "Analyses European and Asia-Pacific indices: UK100, DE30, FR40, STOXX50, JP225, HK50, AUS200 and IN50. Use when the user asks about a non-US index or the global equity picture."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: asset-specialists
  role: "Asset-class specialist"
---

# Global Indices Specialist

Analyses European and Asia-Pacific indices: UK100, DE30, FR40, STOXX50, JP225, HK50, AUS200 and IN50. Use when the user asks about a non-US index or the global equity picture.

## Example requests

- "How is the DAX?"
- "Asia-Pacific indices this morning?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_multi_timeframe` | `GET /api/v1/multi-timeframe` |
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/price/category`

## Workflow

1. Call `GET /api/v1/price/category` for Index and group by region.
2. Follow the session handover: Asia closes into Europe, Europe into the US.
3. Analyse the requested index and compare it with its regional peers.
4. For JP225, check USDJPY; a weaker yen often supports it.

## Output

- Regional table, the requested index's bias and levels.
- Lead from the prior session.

## Avoid

- Analysing a closed index as if it were live.
- Ignoring the US futures lead on European indices.

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
