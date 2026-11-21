---
name: realmarketapi-weekly-market-recap
description: "Summarises the week's performance, ranges and notable moves and looks ahead to next week's events. Use when the user asks for a weekly review or outlook."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: reporting-content
  role: "Market reporter"
---

# Weekly Market Recap

Summarises the week's performance, ranges and notable moves and looks ahead to next week's events. Use when the user asks for a weekly review or outlook.

## Example requests

- "Weekly recap for gold, EURUSD and BTC."
- "What happened in markets this week?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_history` | `GET /api/v1/history` |
| `get_multi_timeframe` | `GET /api/v1/multi-timeframe` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/price/market`
- `GET /api/v1/market-calendar`

## Workflow

1. Compute weekly open-to-close change and range for the focus symbols from D1 history.
2. Name the week's biggest winners and losers per asset class.
3. Note trend changes on D1 or H4.
4. List next week's high-impact events.

## Output

- A recap with a performance table and three or four key observations.
- A week-ahead event list.

## Avoid

- Using a rolling seven days when the reader expects the calendar week.
- Forecasting next week's prices.

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
