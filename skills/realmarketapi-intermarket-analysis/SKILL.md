---
name: realmarketapi-intermarket-analysis
description: "Reads the relationships between the dollar, gold, oil, equity indices and bitcoin to judge the macro tone. Use when the user asks what is driving markets or wants cross-market confirmation."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: asset-specialists
  role: "Asset-class specialist"
---

# Intermarket Analysis

Reads the relationships between the dollar, gold, oil, equity indices and bitcoin to judge the macro tone. Use when the user asks what is driving markets or wants cross-market confirmation.

## Example requests

- "What is driving markets today?"
- "Is this a risk-off move?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_history` | `GET /api/v1/history` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/price/market`

## Workflow

1. Pull DXY, XAUUSD, USOIL, US500, USTEC and BTCUSD from one `GET /api/v1/price/market` call.
2. Classify the day: risk-on (indices and bitcoin up, dollar down), risk-off (the reverse, gold bid), or mixed.
3. Note relationships that are breaking, such as gold and the dollar rising together.
4. Say which market is leading by the size and timing of its move.

## Output

- A cross-market table with direction and the regime label.
- Unusual relationships and the likely leader.

## Avoid

- Assuming textbook correlations hold every day.
- Claiming causes that price data cannot show.

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
