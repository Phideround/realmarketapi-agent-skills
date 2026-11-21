---
name: realmarketapi-timeframe-selector
description: "Chooses the analysis, execution and trigger timeframes that fit a trading horizon and the timeframes a plan allows. Use when the user gives no timeframe or describes a horizon such as scalp, intraday or swing."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: foundations
  role: "Any agent"
---

# Timeframe Selector

Chooses the analysis, execution and trigger timeframes that fit a trading horizon and the timeframes a plan allows. Use when the user gives no timeframe or describes a horizon such as scalp, intraday or swing.

## Example requests

- "What timeframes should I use for swing trading EURUSD?"
- "Analyse BTC for a scalp."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_timeframes` | `GET /api/v1/me (timeframes on your plan)` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/me`

## Workflow

1. Read the timeframes available to the key with `get_timeframes` or `GET /api/v1/me`.
2. Map the horizon: scalp uses M15 context, M5 execution, M1 trigger; intraday uses H4, H1, M15; swing uses D1, H4, H1; position uses D1 only.
3. If a timeframe is not on the plan, move to the nearest allowed one and say so.
4. Keep the context timeframe four to six times larger than the execution timeframe.

## Output

- Context, execution and trigger timeframes with the reason for each.
- Any substitution forced by the plan.

## Avoid

- Mixing timeframes that are too close together, such as M1 and M5 for context and execution.
- Using D1 signals to time a scalp.

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
