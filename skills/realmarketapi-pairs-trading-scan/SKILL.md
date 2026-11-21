---
name: realmarketapi-pairs-trading-scan
description: "Tests whether two related symbols have a stable spread and how stretched it is now. Use when the user asks about a relative-value trade between two instruments."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: quant-research
  role: "Quant researcher"
---

# Pairs Trading Scan

Tests whether two related symbols have a stable spread and how stretched it is now. Use when the user asks about a relative-value trade between two instruments.

## Example requests

- "Is the Brent-WTI spread stretched?"
- "Pairs trade between gold and silver?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_history` | `GET /api/v1/history` |
| `get_price` | `GET /api/v1/price` |

## Workflow

1. Pull the same window for both symbols, for example USOIL and UKOIL or XAUUSD and XAGUSD.
2. Compute the ratio or the regression spread and its rolling mean and standard deviation.
3. Express today's spread as a z-score.
4. Report how quickly past stretches closed, and whether the relationship has drifted.

## Output

- Current z-score, the historical range and the mean-reversion record.
- Entry and exit thresholds if the pair qualifies.

## Avoid

- Pairing two symbols because they look similar on a chart.
- Assuming the spread must revert.

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
