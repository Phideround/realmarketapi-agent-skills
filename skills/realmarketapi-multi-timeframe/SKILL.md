---
name: realmarketapi-multi-timeframe
description: "Checks trend alignment from the highest to the lowest timeframe in one pass. Use when the user asks for a top-down view or whether timeframes agree."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: technical-analysis
  role: "Technical analyst"
---

# Multi-Timeframe Analysis

Checks trend alignment from the highest to the lowest timeframe in one pass. Use when the user asks for a top-down view or whether timeframes agree.

## Example requests

- "Top-down analysis of GBPUSD."
- "Are the timeframes aligned on gold?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_multi_timeframe` | `GET /api/v1/multi-timeframe` |
| `get_insight_trend` | `GET /api/v1/insight/trend` |
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |

## Workflow

1. Call `get_multi_timeframe` once for the symbol to get the trend on every timeframe.
2. Group them as higher (D1, H4), execution (H1, M15) and trigger (M5, M1).
3. Classify: fully aligned, pullback within a higher trend, or conflicting.
4. Add higher-timeframe levels from `get_support_resistance` that the lower timeframes are approaching.

## Output

- A timeframe table with trend per row and the alignment verdict.
- Trade direction the alignment favours, or stand aside.

## Avoid

- Letting an M5 signal override a D1 trend.
- Fetching each timeframe separately when one call returns all.

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
