---
name: realmarketapi-daily-market-brief
description: "Writes a short daily briefing across asset classes with movers, levels and the day's events. Use when the user asks for a daily market summary or morning note."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: reporting-content
  role: "Market reporter"
---

# Daily Market Brief

Writes a short daily briefing across asset classes with movers, levels and the day's events. Use when the user asks for a daily market summary or morning note.

## Example requests

- "Write today's market brief."
- "Morning note for a forex desk."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/price/market`
- `GET /api/v1/price/24hr`
- `GET /api/v1/market-calendar`

## Workflow

1. One batch call for prices, one for 24h stats, one for the calendar.
2. Write a two-line headline on the overall tone.
3. Add one line per asset class with its leader and laggard.
4. Pick up to three focus symbols and give their key levels.
5. Close with today's events in the reader's timezone.

## Output

- A brief of about 150 to 250 words with a small table of movers.
- Data timestamp and a not-advice line.

## Avoid

- A wall of numbers with no reading of them.
- Stating causes that the data cannot support.

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
