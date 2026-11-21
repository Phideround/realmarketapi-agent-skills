---
name: realmarketapi-relative-strength-ranking
description: "Ranks a set of symbols by performance over several lookback windows. Use when the user asks which instruments are strongest or weakest."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: quant-research
  role: "Quant researcher"
---

# Relative Strength Ranking

Ranks a set of symbols by performance over several lookback windows. Use when the user asks which instruments are strongest or weakest.

## Example requests

- "Strongest stocks this month?"
- "Rank the indices by momentum."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_history` | `GET /api/v1/history` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/price/24hr`

## Workflow

1. Compute returns over one day, one week and one month for each symbol.
2. Rank within each window and average the ranks.
3. Mark symbols that are strong on all windows and those turning up or down.

## Output

- A ranked table with return per window and a composite rank.
- Consistent leaders, consistent laggards and turners.

## Avoid

- Ranking across asset classes without adjusting for volatility.
- Calling a one-day spike relative strength.

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
