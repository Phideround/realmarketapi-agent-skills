---
name: realmarketapi-session-open-playbook
description: "Trades the break of the prior session's range at the London or New York open. Use when the user asks about an opening-range or session-breakout trade."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: sessions-macro
  role: "Macro analyst"
---

# Session Open Playbook

Trades the break of the prior session's range at the London or New York open. Use when the user asks about an opening-range or session-breakout trade.

## Example requests

- "London open plan for GBPUSD."
- "New York open setup on gold?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_candles` | `GET /api/v1/candle` |
| `get_volatility_heatmap` | `GET /api/v1/volatility/heatmap` |
| `get_stop_hunt_zones` | `GET /api/v1/stop-hunt/zones` |
| `get_atr` | `GET /api/v1/indicator/atr` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/market-calendar`

## Workflow

1. Get the session open time from the calendar.
2. Mark the prior session's high and low from M15 candles.
3. At the open, watch for a sweep of one side followed by a close back inside (fade), or a clean close outside with expansion (follow).
4. Stop beyond the opening move's extreme; target the other side of the range, then one range height beyond.

## Output

- Range high and low, the scenario in play, entry, stop and target.
- The time after which the setup expires.

## Avoid

- Trading the first candle of the open.
- Using the setup on days with a major release at the open.

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
