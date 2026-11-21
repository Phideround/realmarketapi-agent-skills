---
name: realmarketapi-price-change-calculator
description: "Calculates the absolute and percentage change of a symbol between two points in time. Use when the user asks how much something moved over a period such as this week, this month or since a date."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: market-data
  role: "Market data analyst"
---

# Price Change Calculator

Calculates the absolute and percentage change of a symbol between two points in time. Use when the user asks how much something moved over a period such as this week, this month or since a date.

## Example requests

- "How much is gold up this month?"
- "BTC performance since 1 January?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_history` | `GET /api/v1/history` |
| `get_price` | `GET /api/v1/price` |

## Workflow

1. Turn the period into exact UTC start and end times.
2. Fetch the candle at the start with `get_history` on D1 or H1, and the latest with `get_price`.
3. Compute change and percentage change from the start open to the latest close, plus the high and low in between.

## Output

- Start price, end price, change, percentage change, period high and low.
- The exact timestamps used.

## Avoid

- Using a start date outside the plan's history range without saying so.
- Mixing close-to-close with open-to-close.

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
