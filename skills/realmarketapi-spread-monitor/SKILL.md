---
name: realmarketapi-spread-monitor
description: "Measures the bid-ask spread of a symbol and tells whether it is normal or wide. Use when the user asks about trading cost, liquidity or whether now is a good time to execute."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: market-data
  role: "Market data analyst"
---

# Spread Monitor

Measures the bid-ask spread of a symbol and tells whether it is normal or wide. Use when the user asks about trading cost, liquidity or whether now is a good time to execute.

## Example requests

- "What is the spread on GBPJPY?"
- "Is gold spread wide right now?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_price` | `GET /api/v1/price` |

REST and WebSocket only (no MCP tool):

- `wss://api.realmarketapi.com/price`

## Workflow

1. Read bid and ask from `get_price`, or sample the `/price` WebSocket for a minute on Plus or above.
2. Express the spread in price units, in pips for forex, and as a percentage of price.
3. Compare with the samples collected in this session and with the current session; spreads widen at rollover and around news.

## Output

- Current spread in price, pips and percent, labelled tight, normal or wide.
- A timing note if the spread is wide.

## Avoid

- Calling a spread wide from a single sample.
- Presenting indicative spreads as a specific broker's execution cost.

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
