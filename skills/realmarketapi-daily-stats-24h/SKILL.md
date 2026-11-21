---
name: realmarketapi-daily-stats-24h
description: "Reports 24-hour open, high, low, volume and percentage change per symbol. Use when the user asks for the day's range, 24h change or 24h volume."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: market-data
  role: "Market data analyst"
---

# 24-Hour Statistics

Reports 24-hour open, high, low, volume and percentage change per symbol. Use when the user asks for the day's range, 24h change or 24h volume.

## Example requests

- "What is bitcoin's 24h range?"
- "24h change for gold and silver."

## Data sources

- `GET /api/v1/price/24hr`

## Workflow

1. Call `GET /api/v1/price/24hr` and select the requested symbols.
2. Report `openPrice24h`, `highPrice24h`, `lowPrice24h`, `volume24h` and `changePercent24h`.
3. Add the range as a percentage of the open so symbols can be compared.

## Output

- 24h open, high, low, change and range percentage per symbol.
- Which symbol had the widest range, if several were asked.

## Avoid

- Confusing the 24h rolling window with the calendar day.
- Comparing raw volume across different asset classes.

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
