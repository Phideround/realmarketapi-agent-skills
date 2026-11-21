---
name: realmarketapi-performance-metrics
description: "Computes standard performance statistics from a list of trades or an equity curve. Use when the user has results and asks how good the strategy is."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: quant-research
  role: "Quant researcher"
---

# Performance Metrics

Computes standard performance statistics from a list of trades or an equity curve. Use when the user has results and asks how good the strategy is.

## Example requests

- "Is this strategy any good? Here are my trades."
- "Calculate Sharpe and drawdown for this equity curve."

## Data sources

No API call of its own. This skill works on data and results gathered by other skills.

## Workflow

1. From trades: win rate, average win and loss, payoff ratio, expectancy per trade, profit factor.
2. From equity: total return, annualised return and volatility, Sharpe and Sortino, maximum drawdown and its duration.
3. State the sample size and flag anything under 30 trades as unreliable.

## Output

- A metrics table with a one-line interpretation of each.
- The weakest number and what it implies.

## Avoid

- Quoting a Sharpe ratio without the period it is annualised from.
- Judging by win rate alone.

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
