---
name: realmarketapi-stop-hunt-zones
description: "Identifies areas beyond key levels where stop orders are likely clustered and exposed to a sweep. Use when the user asks about stop hunts, fake-outs or safe stop placement."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: market-structure
  role: "Market structure analyst"
---

# Stop-Hunt Zones

Identifies areas beyond key levels where stop orders are likely clustered and exposed to a sweep. Use when the user asks about stop hunts, fake-outs or safe stop placement.

## Example requests

- "Where are stops likely sitting on EURUSD?"
- "Is my stop in a stop-hunt zone?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_stop_hunt_zones` | `GET /api/v1/stop-hunt/zones` |
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |

## Workflow

1. Call `get_stop_hunt_zones` for the symbol and timeframe.
2. Relate each zone to the level it sits beyond from `get_support_resistance`.
3. Say which zone is closest and how far price is from it in ATR terms.
4. Advise: stops go beyond the zone, entries wait for a sweep and reclaim.

## Output

- Zones above and below with the level each protects.
- Guidance for stop placement and for sweep entries.

## Avoid

- Predicting that a sweep will happen.
- Placing a stop inside a zone.

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
