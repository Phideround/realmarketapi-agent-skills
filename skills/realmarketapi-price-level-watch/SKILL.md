---
name: realmarketapi-price-level-watch
description: "Derives the levels worth watching on a symbol and turns them into alert proposals. Use when the user wants to stop watching the chart and be told when price reaches something important."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: alerts-monitoring
  role: "Monitoring agent"
---

# Price Level Watch

Derives the levels worth watching on a symbol and turns them into alert proposals. Use when the user wants to stop watching the chart and be told when price reaches something important.

## Example requests

- "Set alerts at the key levels on gold."
- "Tell me when EURUSD reaches support."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |
| `get_liquidity_zones` | `GET /api/v1/liquidity/zones` |
| `get_price` | `GET /api/v1/price` |

REST and WebSocket only (no MCP tool):

- `POST /api/v1/alerts`

## Workflow

1. Get levels from `get_support_resistance` and `get_liquidity_zones`.
2. Keep the nearest two on each side of price.
3. Propose one alert per level with a sensible cooldown.
4. Create them only after the user approves the list.

## Output

- The proposed levels with why each matters.
- The alerts created, if approved.

## Avoid

- Ten alerts on one symbol.
- Alerts on levels price is already sitting on.

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
