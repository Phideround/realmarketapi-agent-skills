---
name: realmarketapi-trade-journal
description: "Records trades with market conditions at entry and reviews them for patterns. Use when the user wants to log a trade or review past performance."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: trading-strategies
  role: "Trader"
---

# Trade Journal

Records trades with market conditions at entry and reviews them for patterns. Use when the user wants to log a trade or review past performance.

## Example requests

- "Log this trade for me."
- "Review my last 30 trades."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_history` | `GET /api/v1/history` |
| `get_volatility` | `GET /api/v1/volatility` |
| `get_multi_timeframe` | `GET /api/v1/multi-timeframe` |

## Workflow

1. Capture per trade: symbol, direction, entry, stop, target, exit, size, setup type and reason.
2. Enrich with conditions at entry time from `get_history`: trend, volatility regime and session.
3. Compute result in R, win rate, average win and loss, and expectancy.
4. Group by setup, session and symbol to find what works and what does not.

## Output

- A structured journal entry or a review table.
- The two strongest and two weakest patterns.

## Avoid

- Logging only winners.
- Drawing conclusions from fewer than twenty trades.

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
