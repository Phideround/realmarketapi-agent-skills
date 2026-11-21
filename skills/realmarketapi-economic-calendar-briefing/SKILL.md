---
name: realmarketapi-economic-calendar-briefing
description: "Lists the day's high-impact economic events and the symbols they affect. Use when the user asks what is on the calendar or what could move the market today."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: sessions-macro
  role: "Macro analyst"
---

# Economic Calendar Briefing

Lists the day's high-impact economic events and the symbols they affect. Use when the user asks what is on the calendar or what could move the market today.

## Example requests

- "What is on the calendar today?"
- "Any big news for gold this week?"

## Data sources

- `GET /api/v1/market-calendar`

## Workflow

1. Call `GET /api/v1/market-calendar` for the date and timezone.
2. Keep high-impact events and order them by time.
3. Map each to affected symbols: US data to DXY, gold, indices and USD pairs; eurozone data to EURUSD and DE30; and so on.

## Output

- Event list with time, currency and affected symbols.
- The quiet and busy parts of the day.

## Avoid

- Predicting the figures.
- Listing low-impact events that bury the important ones.

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
