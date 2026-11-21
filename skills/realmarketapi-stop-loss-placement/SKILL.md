---
name: realmarketapi-stop-loss-placement
description: "Proposes a stop-loss level from structure, volatility and known stop-hunt zones. Use when the user has an entry idea and asks where the stop should go."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: risk-volatility
  role: "Risk manager"
---

# Stop-Loss Placement

Proposes a stop-loss level from structure, volatility and known stop-hunt zones. Use when the user has an entry idea and asks where the stop should go.

## Example requests

- "Where should my stop go on a gold long from 2,650?"
- "Stop for a EURUSD short on H1?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_atr` | `GET /api/v1/indicator/atr` |
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |
| `get_stop_hunt_zones` | `GET /api/v1/stop-hunt/zones` |

## Workflow

1. Find the structural level that invalidates the idea with `get_support_resistance`.
2. Add a buffer of 0.25 to 0.5 ATR beyond that level.
3. Call `get_stop_hunt_zones`; if the stop sits inside a zone, move it beyond the zone or reduce size.
4. Check the stop is at least 1 ATR from entry on the execution timeframe.

## Output

- Stop level, distance in price and ATR multiples, and the reason.
- A wider alternative when the first sits in a stop-hunt zone.

## Avoid

- Placing the stop exactly on a round number or obvious swing.
- Tightening the stop to make the size bigger.

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
