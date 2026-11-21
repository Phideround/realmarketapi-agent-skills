---
name: realmarketapi-oil-specialist
description: "Analyses WTI and Brent crude and the spread between them. Use when the user asks about oil, USOIL or UKOIL."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: asset-specialists
  role: "Asset-class specialist"
---

# Crude Oil Specialist

Analyses WTI and Brent crude and the spread between them. Use when the user asks about oil, USOIL or UKOIL.

## Example requests

- "Outlook for crude oil?"
- "Brent vs WTI spread?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_price` | `GET /api/v1/price` |
| `get_multi_timeframe` | `GET /api/v1/multi-timeframe` |
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |
| `get_volatility` | `GET /api/v1/volatility` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/market-calendar`

## Workflow

1. Fetch USOIL and UKOIL and compute the Brent minus WTI spread.
2. Analyse the requested contract's trend and levels.
3. Check the calendar for inventory reports and other scheduled energy events.
4. Read `get_volatility`; oil gaps and trends hard on supply headlines.

## Output

- Oil bias, levels, the Brent-WTI spread and event risk.
- Volatility-adjusted stop guidance.

## Avoid

- Explaining a move with supply news the API cannot confirm.
- Ignoring the weekly inventory release.

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
