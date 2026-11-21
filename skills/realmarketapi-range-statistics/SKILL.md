---
name: realmarketapi-range-statistics
description: "Computes average daily range, typical session range and how much of today's range is already used. Use when the user asks how far a symbol usually moves or whether today's move is stretched."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: market-data
  role: "Market data analyst"
---

# Range Statistics

Computes average daily range, typical session range and how much of today's range is already used. Use when the user asks how far a symbol usually moves or whether today's move is stretched.

## Example requests

- "How much does GBPUSD move per day?"
- "Has gold used its daily range?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_history` | `GET /api/v1/history` |
| `get_candles` | `GET /api/v1/candle` |
| `get_atr` | `GET /api/v1/indicator/atr` |

## Workflow

1. Pull the last 20 to 30 D1 candles with `get_history` and average high minus low for the average daily range.
2. Compare with `get_atr` on D1 as a cross-check.
3. Compute today's range so far from intraday candles and express it as a percentage of the average.

## Output

- Average daily range in price and percent, today's range and the share used.
- A note when today exceeds 100% of the average.

## Avoid

- Assuming a used-up range means reversal.
- Averaging fewer than ten days.

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
