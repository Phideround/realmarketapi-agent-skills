---
name: realmarketapi-cross-asset-comparison
description: "Compares the performance of several symbols over the same window on a normalised basis. Use when the user asks which asset did better or wants to compare instruments side by side."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: market-data
  role: "Market data analyst"
---

# Cross-Asset Comparison

Compares the performance of several symbols over the same window on a normalised basis. Use when the user asks which asset did better or wants to compare instruments side by side.

## Example requests

- "Gold vs bitcoin vs S&P this quarter."
- "Which did better this month, NVDA or AMD?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_history` | `GET /api/v1/history` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/price/24hr`

## Workflow

1. For a 24h comparison use `GET /api/v1/price/24hr`. For longer windows pull D1 history for each symbol over the same dates.
2. Rebase each series to 100 at the start and compute total return, the largest drawdown and daily volatility.
3. Rank by return and by return divided by volatility.

## Output

- A table of return, volatility, drawdown and rank per symbol.
- One line naming the leader on a risk-adjusted basis.

## Avoid

- Comparing windows of different lengths.
- Comparing more than about eight symbols in one table.

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
