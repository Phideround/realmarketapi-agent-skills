---
name: realmarketapi-incident-triage
description: "Investigates a sudden move and reports what happened, how unusual it is and what state the market is in now. Use when the user asks what just happened to a symbol."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: alerts-monitoring
  role: "Monitoring agent"
---

# Incident Triage

Investigates a sudden move and reports what happened, how unusual it is and what state the market is in now. Use when the user asks what just happened to a symbol.

## Example requests

- "Why did gold just drop $30?"
- "What happened to BTC an hour ago?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_candles` | `GET /api/v1/candle` |
| `get_anomaly` | `GET /api/v1/anomaly` |
| `get_volatility_spikes` | `GET /api/v1/volatility/spikes` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/market-calendar`
- `GET /api/v1/price/market`

## Workflow

1. Measure the move: size, duration and how many ATRs.
2. Check `get_anomaly` and `get_volatility_spikes` for the bar.
3. Check the calendar for a scheduled event at that time.
4. Check related markets in one batch call to see whether the move is isolated or broad.
5. State the current condition: extending, stabilising or reversing.

## Output

- What moved, by how much, when, and how unusual.
- Scheduled trigger if any, breadth, and current state.

## Avoid

- Supplying an unverified news explanation.
- Recommending a trade inside the first minutes of a shock.

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
