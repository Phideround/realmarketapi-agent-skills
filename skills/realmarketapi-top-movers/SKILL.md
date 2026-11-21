---
name: realmarketapi-top-movers
description: "Ranks the biggest gainers and losers over the last 24 hours. Use when the user asks what is moving, what is hot, or wants ideas to look at."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: market-data
  role: "Market data analyst"
---

# Top Movers

Ranks the biggest gainers and losers over the last 24 hours. Use when the user asks what is moving, what is hot, or wants ideas to look at.

## Example requests

- "What are today's top movers?"
- "Which forex pairs moved most in 24h?"

## Data sources

- `GET /api/v1/price/24hr`

## Workflow

1. Call `GET /api/v1/price/24hr` once and sort by `changePercent24h`.
2. Take the top five gainers and top five losers; optionally filter to one asset class.
3. Flag any move larger than about three times that symbol's typical daily range as unusual and suggest the anomaly skill.

## Output

- Two short ranked lists with symbol, price and percentage change.
- Flags on unusual moves.

## Avoid

- Explaining a move with invented news.
- Ranking stocks and crypto together without saying so.

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
