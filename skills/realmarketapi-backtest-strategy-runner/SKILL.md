---
name: realmarketapi-backtest-strategy-runner
description: "Runs a rule-based strategy over historical candles and reports the result with costs. Use when the user describes entry and exit rules and asks how they would have performed."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: quant-research
  role: "Quant researcher"
---

# Backtest Strategy Runner

Runs a rule-based strategy over historical candles and reports the result with costs. Use when the user describes entry and exit rules and asks how they would have performed.

## Example requests

- "Backtest a 20/50 EMA cross on gold H1."
- "How would RSI 30/70 have done on BTC?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_history` | `GET /api/v1/history` |

## Workflow

1. Write the rules precisely: entry, exit, stop, size, one position at a time or not.
2. Compute indicators locally from the candles so every bar has a value; act on the next bar's open to avoid look-ahead.
3. Subtract spread and commission from every trade.
4. Report on the out-of-sample period separately from the in-sample period.

## Output

- Trade list, equity curve and a metrics summary.
- The assumptions: costs, fill model, size.

## Avoid

- Using a bar's close to enter at that same bar's open.
- Reporting only the best parameter set.

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
