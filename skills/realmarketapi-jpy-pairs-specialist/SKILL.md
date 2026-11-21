---
name: realmarketapi-jpy-pairs-specialist
description: "Analyses USDJPY and GBPJPY with attention to their volatility, risk sensitivity and sharp reversals. Use when the user asks about yen pairs."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: asset-specialists
  role: "Asset-class specialist"
---

# JPY Pairs Specialist

Analyses USDJPY and GBPJPY with attention to their volatility, risk sensitivity and sharp reversals. Use when the user asks about yen pairs.

## Example requests

- "USDJPY analysis."
- "Is GBPJPY a buy?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_price` | `GET /api/v1/price` |
| `get_atr` | `GET /api/v1/indicator/atr` |
| `get_multi_timeframe` | `GET /api/v1/multi-timeframe` |
| `get_volatility_spikes` | `GET /api/v1/volatility/spikes` |
| `get_stop_hunt_zones` | `GET /api/v1/stop-hunt/zones` |

## Workflow

1. Read both pairs to separate yen strength from dollar or sterling strength.
2. Check `get_atr`; GBPJPY needs wider stops than almost any other pair.
3. Review recent `get_volatility_spikes` for abrupt yen moves.
4. Relate direction to equity indices: yen pairs often fall when risk sentiment drops.

## Output

- Yen read, pair bias and volatility-adjusted stop distance.
- Risk-sentiment note.

## Avoid

- Quoting pip distances as if one pip were 0.0001; on yen pairs it is 0.01.
- Tight stops on GBPJPY.

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
