---
name: realmarketapi-xauusd-specialist
description: "Analyses gold with its own habits in mind: session behaviour, round numbers, dollar linkage and liquidity sweeps. Use when the symbol is XAUUSD or the user asks about gold."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: asset-specialists
  role: "Asset-class specialist"
---

# XAUUSD Gold Specialist

Analyses gold with its own habits in mind: session behaviour, round numbers, dollar linkage and liquidity sweeps. Use when the symbol is XAUUSD or the user asks about gold.

## Example requests

- "Analyse gold."
- "XAUUSD setup for the New York session?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_price` | `GET /api/v1/price` |
| `get_multi_timeframe` | `GET /api/v1/multi-timeframe` |
| `get_liquidity_zones` | `GET /api/v1/liquidity/zones` |
| `get_stop_hunt_zones` | `GET /api/v1/stop-hunt/zones` |
| `get_volatility_heatmap` | `GET /api/v1/volatility/heatmap` |
| `get_baseline_candles` | `GET /api/v1/market/baseline-candles-hourly` |

## Workflow

1. Set context with `get_baseline_candles` and the trend with `get_multi_timeframe`.
2. Check DXY direction with a second `get_price`; gold often moves against the dollar.
3. Mark round numbers every 10 and 50 dollars alongside `get_liquidity_zones` and `get_stop_hunt_zones`.
4. Read the session: Asia often ranges, London sets direction, the New York overlap brings the largest moves.
5. Use wider stops than forex: at least 1.5 ATR on the execution timeframe.

## Output

- Gold bias with levels, session read and dollar context.
- Stop guidance sized for gold's volatility.

## Avoid

- Forex-sized stops on gold.
- Ignoring a sweep of the Asian range at the London open.

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
