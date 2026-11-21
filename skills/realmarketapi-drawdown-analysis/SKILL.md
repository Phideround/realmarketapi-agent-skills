---
name: realmarketapi-drawdown-analysis
description: "Measures maximum drawdown, current drawdown and recovery time of a symbol or an equity series. Use when the user asks how bad the worst decline was or how deep the current pullback is."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: risk-volatility
  role: "Risk manager"
---

# Drawdown Analysis

Measures maximum drawdown, current drawdown and recovery time of a symbol or an equity series. Use when the user asks how bad the worst decline was or how deep the current pullback is.

## Example requests

- "What was bitcoin's max drawdown this year?"
- "How far is NVDA off its high?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_history` | `GET /api/v1/history` |

## Workflow

1. Pull D1 history for the window, or take the user's equity curve.
2. Track the running peak and compute drawdown at each point as value over peak minus one.
3. Report the maximum drawdown with its peak and trough dates, the current drawdown and the longest time to recover.

## Output

- Maximum drawdown, dates, current drawdown and recovery time.
- The gain needed to recover from the current drawdown.

## Avoid

- Reporting drawdown on a window shorter than the question implies.
- Confusing drawdown from peak with loss from entry.

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
