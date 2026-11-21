---
name: realmarketapi-golden-death-cross
description: "Checks the 50 and 200 period SMA relationship on the daily chart. Use when the user asks about a golden cross, a death cross or the long-term trend filter."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: technical-analysis
  role: "Technical analyst"
---

# Golden and Death Cross

Checks the 50 and 200 period SMA relationship on the daily chart. Use when the user asks about a golden cross, a death cross or the long-term trend filter.

## Example requests

- "Has bitcoin had a golden cross?"
- "Is US500 above its 200-day average?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_sma` | `GET /api/v1/indicator/sma` |

## Workflow

1. Call `get_sma` on D1 with period 50 and period 200.
2. Report which is higher, the gap as a percentage, and whether the gap is closing.
3. Find the most recent cross and how many days ago it happened.

## Output

- Current state, gap and date of the last cross.
- Whether a new cross is near.

## Avoid

- Treating the cross as a timing signal; it lags.
- Running it on a plan without enough D1 history.

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
