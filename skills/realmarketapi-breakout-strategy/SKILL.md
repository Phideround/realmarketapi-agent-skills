---
name: realmarketapi-breakout-strategy
description: "Trades a confirmed break of a well-tested level with volatility expansion. Use when price is compressing under resistance or above support and the user asks about a breakout."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: trading-strategies
  role: "Trader"
---

# Breakout Strategy

Trades a confirmed break of a well-tested level with volatility expansion. Use when price is compressing under resistance or above support and the user asks about a breakout.

## Example requests

- "Is gold breaking out?"
- "Breakout plan for BTC above resistance."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |
| `get_bollinger_bands` | `GET /api/v1/indicator/bollinger-bands` |
| `get_candles` | `GET /api/v1/candle` |
| `get_adx` | `GET /api/v1/indicator/adx` |
| `get_stop_hunt_zones` | `GET /api/v1/stop-hunt/zones` |

## Workflow

1. Find a level tested at least twice with `get_support_resistance`.
2. Confirm compression: narrow Bollinger width or shrinking candle ranges.
3. Require a candle close beyond the level with above-average volume and rising ADX.
4. Enter on the close or on the retest; stop back inside the range by 1 ATR; target the range height projected from the level.
5. If price closes back inside within two bars, treat it as a failed break and exit.

## Output

- Level, confirmation status, entry, stop, target.
- The failed-break rule.

## Avoid

- Entering on a wick through the level.
- Buying a breakout straight into a higher-timeframe level.

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
