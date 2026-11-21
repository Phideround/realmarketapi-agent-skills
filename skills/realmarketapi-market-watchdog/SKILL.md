---
name: realmarketapi-market-watchdog
description: "Runs a periodic check for anomalies, volatility spikes and risk changes across a set of symbols. Use when the user wants unattended monitoring with reports only when something matters."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: alerts-monitoring
  role: "Monitoring agent"
---

# Market Watchdog

Runs a periodic check for anomalies, volatility spikes and risk changes across a set of symbols. Use when the user wants unattended monitoring with reports only when something matters.

## Example requests

- "Monitor my watchlist and ping me on anything unusual."
- "Watch the majors overnight."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_anomaly` | `GET /api/v1/anomaly` |
| `get_volatility_spikes` | `GET /api/v1/volatility/spikes` |
| `get_manipulation_risk` | `GET /api/v1/manipulation-risk` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/price/market`

## Workflow

1. Agree the symbol set, the interval and the quota budget.
2. Each cycle: one `GET /api/v1/price/market` call, then deeper calls only for symbols that moved more than a threshold.
3. Report only new findings; keep the last state to avoid repeating yourself.
4. Stop or slow down when quota usage passes the agreed budget.

## Output

- A short incident line per finding with time and size.
- A no-news heartbeat at most once per agreed period.

## Avoid

- Deep calls on every symbol every cycle.
- Running forever without a quota limit.

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
