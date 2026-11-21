---
name: realmarketapi-execution-planner
description: "Turns an approved decision into a precise order ticket for a human or a broker integration to place. Use after a trade is approved and before it is entered."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: agent-teams
  role: "Team role"
---

# Execution Planner

Turns an approved decision into a precise order ticket for a human or a broker integration to place. Use after a trade is approved and before it is entered.

## Example requests

- "Write the order ticket for this EURUSD short."
- "How should I enter this gold trade?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_price` | `GET /api/v1/price` |
| `get_atr` | `GET /api/v1/indicator/atr` |
| `get_volatility_heatmap` | `GET /api/v1/volatility/heatmap` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/market-calendar`

## Workflow

1. Choose the order type: limit at a level, stop on a break, or market when immediacy matters.
2. Check spread and session with `get_price` and `get_volatility_heatmap`; avoid rollover and event minutes.
3. Write the ticket: symbol, side, size, entry, stop, targets, expiry.
4. Add what to do if the entry is missed.

## Output

- An order ticket with every field filled.
- Timing guidance and the missed-entry rule.

## Avoid

- Claiming an order was placed; RealMarketAPI does not execute trades.
- Market orders into a wide spread.

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
