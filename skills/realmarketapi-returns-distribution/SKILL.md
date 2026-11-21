---
name: realmarketapi-returns-distribution
description: "Describes the distribution of a symbol's returns, including tails and skew. Use when the user asks how large typical and extreme moves are."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: quant-research
  role: "Quant researcher"
---

# Returns Distribution

Describes the distribution of a symbol's returns, including tails and skew. Use when the user asks how large typical and extreme moves are.

## Example requests

- "How big is a typical daily move in BTC?"
- "How often does gold move more than 2% in a day?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_history` | `GET /api/v1/history` |

## Workflow

1. Compute log returns from D1 or H1 history.
2. Report mean, standard deviation, skew, kurtosis and the 1st, 5th, 95th and 99th percentiles.
3. Count moves beyond three standard deviations and compare with what a normal distribution would give.

## Output

- Summary statistics and percentile table.
- A plain statement of how fat the tails are.

## Avoid

- Assuming normality for risk limits.
- Mixing timeframes in one sample.

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
