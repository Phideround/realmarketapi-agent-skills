---
name: realmarketapi-take-profit-targets
description: "Sets profit targets from opposing structure, Fibonacci extensions and liquidity zones. Use when the user asks where to take profit or how to scale out."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: risk-volatility
  role: "Risk manager"
---

# Take-Profit Targets

Sets profit targets from opposing structure, Fibonacci extensions and liquidity zones. Use when the user asks where to take profit or how to scale out.

## Example requests

- "Targets for a BTC long from here?"
- "Where to take profit on GBPUSD short?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |
| `get_fibonacci` | `GET /api/v1/indicator/fibonacci` |
| `get_liquidity_zones` | `GET /api/v1/liquidity/zones` |
| `get_atr` | `GET /api/v1/indicator/atr` |

## Workflow

1. List opposing levels from `get_support_resistance` and `get_liquidity_zones` in the trade direction.
2. Add extension levels 127.2 and 161.8 from `get_fibonacci`.
3. Set target 1 just before the first level and target 2 before the next.
4. Check each target against the stop for reward to risk and against ATR for reachability in the planned holding time.

## Output

- Two or three targets with distance and reward to risk each.
- A scale-out suggestion.

## Avoid

- Setting a target beyond a major opposing level.
- Targets several daily ranges away for an intraday trade.

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
