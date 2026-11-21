---
name: realmarketapi-portfolio-exposure
description: "Aggregates open positions into net exposure by currency, asset class and direction. Use when the user lists positions and asks about concentration or total risk."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: risk-volatility
  role: "Risk manager"
---

# Portfolio Exposure

Aggregates open positions into net exposure by currency, asset class and direction. Use when the user lists positions and asks about concentration or total risk.

## Example requests

- "Am I overexposed to the dollar?"
- "Total risk across my open trades?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_atr` | `GET /api/v1/indicator/atr` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/price/market`

## Workflow

1. Take the list of positions with size, direction and stop.
2. Price them with one `GET /api/v1/price/market` call and convert to the account currency.
3. Split forex pairs into their two currencies and net the exposure per currency; group the rest by asset class.
4. Sum money at risk to stops and show it as a percentage of the account.

## Output

- Net exposure per currency and asset class, and total risk to stops.
- The largest concentration and how to reduce it.

## Avoid

- Counting long EURUSD and long GBPUSD as diversified.
- Ignoring positions without a stop; treat them as full notional risk.

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
