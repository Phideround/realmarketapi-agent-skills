---
name: realmarketapi-position-trading-playbook
description: "Runs a long-horizon routine on the daily chart using the 50 and 200 period averages. Use when the user wants trades held for weeks to months."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: trading-strategies
  role: "Trader"
---

# Position Trading Playbook

Runs a long-horizon routine on the daily chart using the 50 and 200 period averages. Use when the user wants trades held for weeks to months.

## Example requests

- "Long-term setup on BTCUSD?"
- "Position trade idea on US500."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_sma` | `GET /api/v1/indicator/sma` |
| `get_adx` | `GET /api/v1/indicator/adx` |
| `get_history` | `GET /api/v1/history` |
| `get_atr` | `GET /api/v1/indicator/atr` |

## Workflow

1. Require price above SMA 200 and SMA 50 above SMA 200 for longs; mirrored for shorts.
2. Check `get_adx` on D1 for a real trend.
3. Enter on pullbacks to the SMA 50 that hold on a daily close.
4. Stop 2 to 3 ATR on D1; trail under the SMA 50. Size small enough to sit through normal pullbacks.

## Output

- Regime, entry condition, stop, trail rule and review schedule.
- The condition that ends the position.

## Avoid

- Managing a position trade from intraday charts.
- Tight stops on a daily system.

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
