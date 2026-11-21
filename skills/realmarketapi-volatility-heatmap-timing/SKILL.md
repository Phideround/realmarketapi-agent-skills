---
name: realmarketapi-volatility-heatmap-timing
description: "Uses the day-of-week by hour-of-day volatility heatmap to find the most and least active trading windows. Use when the user asks when a symbol moves most or when to schedule trading."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: risk-volatility
  role: "Risk manager"
---

# Volatility Heatmap Timing

Uses the day-of-week by hour-of-day volatility heatmap to find the most and least active trading windows. Use when the user asks when a symbol moves most or when to schedule trading.

## Example requests

- "When does gold move the most?"
- "Best hours to trade GBPJPY?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_volatility_heatmap` | `GET /api/v1/volatility/heatmap` |

## Workflow

1. Call `get_volatility_heatmap` for the symbol and timeframe.
2. Find the top five and bottom five hour cells and convert them from UTC to the user's timezone.
3. Relate active cells to the Asia, London and New York sessions and their overlap.

## Output

- Most and least active hours by weekday in UTC and local time.
- Recommended windows for breakout tactics and for quiet-range tactics.

## Avoid

- Reporting hours without a timezone.
- Treating the historical pattern as a promise for a given day.

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
