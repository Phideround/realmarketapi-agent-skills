---
name: realmarketapi-correlation-matrix
description: "Computes return correlations between symbols over a chosen window. Use when the user asks whether assets move together or wants to avoid doubling the same exposure."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: risk-volatility
  role: "Risk manager"
---

# Correlation Matrix

Computes return correlations between symbols over a chosen window. Use when the user asks whether assets move together or wants to avoid doubling the same exposure.

## Example requests

- "Correlation between gold, DXY and US500?"
- "Are EURUSD and GBPUSD too correlated to hold both?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_history` | `GET /api/v1/history` |

## Workflow

1. Pull the same D1 or H1 window for each symbol and align timestamps.
2. Compute period returns and the Pearson correlation matrix.
3. Flag pairs above 0.7 or below -0.7.
4. Compare a recent window with a longer one to show whether the relationship is stable.

## Output

- A correlation matrix and the list of strongly related pairs.
- Stability note and what it means for combined positions.

## Avoid

- Correlating prices instead of returns.
- Using fewer than 30 observations.

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
