---
name: realmarketapi-fibonacci-levels
description: "Retrieves Fibonacci retracement and extension levels for the current swing. Use when the user asks for Fibonacci levels, pullback zones or extension targets."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: technical-analysis
  role: "Technical analyst"
---

# Fibonacci Levels

Retrieves Fibonacci retracement and extension levels for the current swing. Use when the user asks for Fibonacci levels, pullback zones or extension targets.

## Example requests

- "Fib levels for XAUUSD H4?"
- "Where is the 61.8 retracement on BTC?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_fibonacci` | `GET /api/v1/indicator/fibonacci` |
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |

## Workflow

1. Call `get_fibonacci`; adjust `lookback` so the swing matches the move the user means.
2. List retracements 23.6, 38.2, 50, 61.8, 78.6 and extensions 127.2 and 161.8.
3. Mark levels that coincide with `get_support_resistance` levels as confluence.
4. Place current price between the two nearest levels.

## Output

- The swing high and low used, and the level table.
- Confluence zones and the nearest level above and below.

## Avoid

- Quoting levels without naming the swing they come from.
- Treating every Fibonacci level as equally strong.

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
