---
name: realmarketapi-seasonality-analysis
description: "Measures average return and volatility by hour of day, day of week or month. Use when the user asks whether a symbol tends to behave differently at certain times."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: quant-research
  role: "Quant researcher"
---

# Seasonality Analysis

Measures average return and volatility by hour of day, day of week or month. Use when the user asks whether a symbol tends to behave differently at certain times.

## Example requests

- "Does gold do better on certain weekdays?"
- "Best hour of the day for EURUSD?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_history` | `GET /api/v1/history` |
| `get_volatility_heatmap` | `GET /api/v1/volatility/heatmap` |

## Workflow

1. Pull enough history: H1 for hourly and weekday effects, D1 for monthly.
2. Group returns by bucket; compute mean, median, hit rate and count.
3. Compare with `get_volatility_heatmap` for the volatility side.
4. Report only effects with enough observations, and say how many.

## Output

- A table per bucket with mean return, hit rate and sample size.
- The strongest effect and its reliability.

## Avoid

- Presenting a small-sample pattern as an edge.
- Ignoring that results depend on the window chosen.

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
