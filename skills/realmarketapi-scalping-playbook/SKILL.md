---
name: realmarketapi-scalping-playbook
description: "Runs a scalping routine on M1 and M5 with M15 context, tight risk and session filters. Use when the user wants very short-term trades lasting minutes."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: trading-strategies
  role: "Trader"
---

# Scalping Playbook

Runs a scalping routine on M1 and M5 with M15 context, tight risk and session filters. Use when the user wants very short-term trades lasting minutes.

## Example requests

- "Scalp setup on XAUUSD?"
- "Any M5 scalp on EURUSD right now?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_candles` | `GET /api/v1/candle` |
| `get_ema` | `GET /api/v1/indicator/ema` |
| `get_rsi` | `GET /api/v1/indicator/rsi` |
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |
| `get_volatility_heatmap` | `GET /api/v1/volatility/heatmap` |
| `get_price` | `GET /api/v1/price` |

## Workflow

1. Trade only in active hours from `get_volatility_heatmap` and when the spread from `get_price` is tight.
2. Take direction from M15: price relative to EMA 50.
3. On M5 wait for a pullback to EMA 20 or a level from `get_support_resistance`.
4. Trigger on M1 with a rejection candle and RSI turning back with the trend.
5. Stop 1 to 1.5 ATR on M5, target the next M5 level, minimum 1:1.5.

## Output

- Direction, trigger, stop, target and the reason, in five lines.
- A no-trade call when spread or session fails the filter.

## Avoid

- Scalping through high-impact news.
- Targets smaller than three times the spread.

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
