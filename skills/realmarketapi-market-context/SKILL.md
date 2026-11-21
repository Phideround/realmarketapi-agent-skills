---
name: realmarketapi-market-context
description: "Builds a quick picture of where a symbol stands right now: last price, 24h baseline, recent candles and position in the day's range. Use first, before deeper technical, risk or decision skills."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: market-data
  role: "Market data analyst"
---

# Market Context

Builds a quick picture of where a symbol stands right now: last price, 24h baseline, recent candles and position in the day's range. Use first, before deeper technical, risk or decision skills.

## Example requests

- "What is gold doing right now?"
- "Give me context on BTCUSD before we analyse it."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_price` | `GET /api/v1/price` |
| `get_baseline_candles` | `GET /api/v1/market/baseline-candles-hourly` |
| `get_candles` | `GET /api/v1/candle` |

## Workflow

1. Call `get_price` for the symbol on the execution timeframe and note bid, ask and `openTime`.
2. Call `get_baseline_candles` for the hourly baseline and 24h change.
3. Call `get_candles` and find the session high, low and where price sits inside that range.
4. Summarise in three lines: level, direction over 24h, and whether price is near an extreme or mid-range.

## Output

- Price, 24h change, day range and position within it, with the timestamp.
- One-line state: trending up, trending down, or ranging.

## Avoid

- Jumping to indicators before the baseline is known.
- Reporting a price without its timeframe and time.

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
