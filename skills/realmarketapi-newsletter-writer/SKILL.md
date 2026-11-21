---
name: realmarketapi-newsletter-writer
description: "Writes a market newsletter issue with a lead story, a data section and a look ahead. Use when the user asks for newsletter or email content about markets."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: reporting-content
  role: "Market reporter"
---

# Newsletter Writer

Writes a market newsletter issue with a lead story, a data section and a look ahead. Use when the user asks for newsletter or email content about markets.

## Example requests

- "Write this week's market newsletter."
- "Draft an email update on crypto for subscribers."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_history` | `GET /api/v1/history` |
| `get_insight_trend` | `GET /api/v1/insight/trend` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/price/market`
- `GET /api/v1/market-calendar`

## Workflow

1. Pick the lead from the largest or most unusual move of the period.
2. Add a data box with five to eight symbols and their change.
3. Add one educational paragraph that explains a concept the lead story used.
4. Close with upcoming events.

## Output

- An issue of 400 to 600 words with a subject line and preview text.
- The data box as a table.

## Avoid

- Writing the lead before fetching the data.
- Recommending trades to a mass audience.

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
