---
name: realmarketapi-volatility-spike-alert
description: "Finds candles where ATR spiked above a multiple of its norm. Use when the user asks whether there was a volatility shock or wants to review abnormal bars."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: risk-volatility
  role: "Risk manager"
---

# Volatility Spike Detection

Finds candles where ATR spiked above a multiple of its norm. Use when the user asks whether there was a volatility shock or wants to review abnormal bars.

## Example requests

- "Were there volatility spikes on EURUSD today?"
- "Show abnormal bars on XAUUSD M15."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_volatility_spikes` | `GET /api/v1/volatility/spikes` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/market-calendar`

## Workflow

1. Call `get_volatility_spikes`; start with `spikeMultiplier` 2 and raise it if too many bars return.
2. List spike bars with time and size relative to normal.
3. Match spike times against `GET /api/v1/market-calendar` events and session opens.
4. Say whether volatility has normalised since the last spike.

## Output

- Spike table: time, multiple of normal, likely trigger if the calendar shows one.
- Current state: elevated or back to normal.

## Avoid

- Attributing a spike to news the calendar does not show.
- Entering during the spike bar.

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
