---
name: realmarketapi-day-trading-playbook
description: "Runs an intraday routine with H4 bias, H1 structure and M15 entries, flat by the end of the session. Use when the user wants trades opened and closed within the day."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: trading-strategies
  role: "Trader"
---

# Day Trading Playbook

Runs an intraday routine with H4 bias, H1 structure and M15 entries, flat by the end of the session. Use when the user wants trades opened and closed within the day.

## Example requests

- "Day trading plan for GBPUSD today."
- "Intraday setup on US500?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_multi_timeframe` | `GET /api/v1/multi-timeframe` |
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |
| `get_insight_setup` | `GET /api/v1/insight/setup` |
| `get_atr` | `GET /api/v1/indicator/atr` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/market-calendar`

## Workflow

1. Check the calendar for today's high-impact events and mark no-trade windows around them.
2. Take the bias from H4 in `get_multi_timeframe`.
3. Mark H1 levels and read the setup type with `get_insight_setup`.
4. Enter on M15 in the direction of the bias at a level; stop 1.5 ATR on M15.
5. Target the next H1 level, and close before the session ends.

## Output

- Today's bias, levels, planned entries and no-trade windows.
- Stop, targets and the latest time to exit.

## Avoid

- Holding a day trade overnight because it is losing.
- More than two or three trades per symbol per day.

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
