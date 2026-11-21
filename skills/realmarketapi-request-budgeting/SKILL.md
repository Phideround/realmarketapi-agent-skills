---
name: realmarketapi-request-budgeting
description: "Plans the smallest set of calls that answers a question and avoids waste on a metered plan. Use before multi-symbol scans, loops, scheduled jobs or any task that could spend more than about twenty requests."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: foundations
  role: "Any agent"
---

# Request Budgeting

Plans the smallest set of calls that answers a question and avoids waste on a metered plan. Use before multi-symbol scans, loops, scheduled jobs or any task that could spend more than about twenty requests.

## Example requests

- "Scan all forex pairs without wasting my quota."
- "How many requests will a daily report cost?"

## Data sources

- `GET /api/v1/me`
- `GET /api/v1/price/market`
- `GET /api/v1/price/24hr`

## Workflow

1. List the data the answer needs, then replace per-symbol loops with batch routes where one exists: `GET /price/market`, `GET /price/category`, `GET /price/24hr`, `POST /screener/query`.
2. Fetch each symbol and timeframe once and reuse it. A candle only changes when it closes, so cache by `openTime`.
3. For history, request up to 1000 rows per page instead of many small pages.
4. For live monitoring on Plus or above, use one WebSocket stream instead of polling.
5. State the estimated call count before starting anything above fifty calls.

## Output

- A call plan with the estimated request count.
- What was cached or batched to keep it small.

## Avoid

- Polling a closed market.
- Calling every indicator when the question needs two.

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
