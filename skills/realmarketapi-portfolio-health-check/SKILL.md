---
name: realmarketapi-portfolio-health-check
description: "Reviews a set of holdings for performance, concentration, correlation and trend health. Use when the user shares a portfolio and asks how it looks."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: screening-watchlists
  role: "Portfolio assistant"
---

# Portfolio Health Check

Reviews a set of holdings for performance, concentration, correlation and trend health. Use when the user shares a portfolio and asks how it looks.

## Example requests

- "How does my portfolio look?"
- "Check these holdings for concentration risk."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_history` | `GET /api/v1/history` |
| `get_insight_trend` | `GET /api/v1/insight/trend` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/price/market`

## Workflow

1. Value the holdings with one batch price call and compute weights.
2. Compute each holding's return over one month and three months from history.
3. Check concentration (any weight above 25 percent) and pairwise correlation.
4. Read the trend of each holding and list those in a downtrend.

## Output

- Weights, returns, concentration and correlation flags, trend table.
- Three observations ordered by importance.

## Avoid

- Recommending specific buys and sells as advice.
- Commenting on fundamentals the API does not provide.

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
