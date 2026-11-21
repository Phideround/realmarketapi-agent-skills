---
name: realmarketapi-atr-analysis
description: "Reads Average True Range to size expected movement on a timeframe. Use when the user asks how volatile a symbol is in price terms or needs a unit for stops and targets."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: technical-analysis
  role: "Technical analyst"
---

# ATR Analysis

Reads Average True Range to size expected movement on a timeframe. Use when the user asks how volatile a symbol is in price terms or needs a unit for stops and targets.

## Example requests

- "What is the ATR on gold H1?"
- "How many pips does EURUSD move per H4 bar?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_atr` | `GET /api/v1/indicator/atr` |
| `get_price` | `GET /api/v1/price` |

## Workflow

1. Call `get_atr` with period 14 and take the last closed value.
2. Express it in price units, in pips for forex, and as a percentage of price.
3. Compare with the ATR of 20 bars ago to say whether volatility is rising or falling.

## Output

- ATR in price, pips and percent, with its trend.
- What one ATR means as a stop or target distance.

## Avoid

- Using ATR as a direction signal.
- Applying a D1 ATR to an M5 trade.

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
