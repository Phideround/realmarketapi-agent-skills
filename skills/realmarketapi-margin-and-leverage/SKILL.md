---
name: realmarketapi-margin-and-leverage
description: "Calculates required margin, effective leverage and distance to a margin call for a position. Use when the user asks about margin, leverage or how much room a position has."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: risk-volatility
  role: "Risk manager"
---

# Margin and Leverage

Calculates required margin, effective leverage and distance to a margin call for a position. Use when the user asks about margin, leverage or how much room a position has.

## Example requests

- "Margin for 0.5 lots of gold at 1:100?"
- "What is my effective leverage?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_price` | `GET /api/v1/price` |

## Workflow

1. Collect position size, contract size, account leverage and balance; state assumptions for anything not given.
2. Notional equals size times contract size times live price. Margin equals notional divided by leverage.
3. Effective leverage equals total notional divided by equity.
4. Estimate the adverse move that brings equity to the broker's margin-call level.

## Output

- Notional, required margin, effective leverage and adverse-move buffer.
- A warning when effective leverage is above 10.

## Avoid

- Quoting a broker's margin rules as fact; they vary.
- Confusing account leverage with effective leverage.

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
