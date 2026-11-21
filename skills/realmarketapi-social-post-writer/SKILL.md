---
name: realmarketapi-social-post-writer
description: "Writes short market updates for social platforms from live data. Use when the user asks for a tweet, post or caption about a market move."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: reporting-content
  role: "Market reporter"
---

# Social Post Writer

Writes short market updates for social platforms from live data. Use when the user asks for a tweet, post or caption about a market move.

## Example requests

- "Write a tweet about gold today."
- "LinkedIn post on the BTC move."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_price` | `GET /api/v1/price` |
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/price/24hr`

## Workflow

1. Fetch the price, the 24h change and one key level.
2. Lead with the fact and the number; follow with one observation.
3. Fit the platform's length and tone; one or two cashtags or hashtags at most.
4. Include the time of the data if the post will be read later.

## Output

- One to three post variants within the length limit.
- The data time used.

## Avoid

- Hype words and price predictions.
- Posting a number that was not fetched in this session.

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
