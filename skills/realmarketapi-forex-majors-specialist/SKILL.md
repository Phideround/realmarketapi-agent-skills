---
name: realmarketapi-forex-majors-specialist
description: "Analyses EURUSD, GBPUSD, USDJPY, AUDUSD, USDCAD and NZDUSD with the dollar as the common driver. Use when the user asks about a major pair or the major pairs as a group."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: asset-specialists
  role: "Asset-class specialist"
---

# Forex Majors Specialist

Analyses EURUSD, GBPUSD, USDJPY, AUDUSD, USDCAD and NZDUSD with the dollar as the common driver. Use when the user asks about a major pair or the major pairs as a group.

## Example requests

- "Outlook for EURUSD?"
- "Which major is weakest against the dollar?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_multi_timeframe` | `GET /api/v1/multi-timeframe` |
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/price/category`
- `GET /api/v1/market-calendar`

## Workflow

1. Read DXY and the majors together with `GET /api/v1/price/category` for Forex.
2. Decide whether the move is dollar-driven (all pairs agree) or pair-specific.
3. Analyse the requested pair with `get_multi_timeframe` and `get_support_resistance`.
4. Check the calendar for events in either currency of the pair.

## Output

- Dollar read, pair bias, levels and upcoming events.
- Whether the pair is the best expression of the dollar view.

## Avoid

- Analysing a pair without checking the dollar.
- Taking the same dollar bet through three pairs at full size.

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
