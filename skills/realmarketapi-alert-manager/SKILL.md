---
name: realmarketapi-alert-manager
description: "Lists, reviews and deletes alert rules. Use when the user asks what alerts they have or wants to clean them up."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: alerts-monitoring
  role: "Monitoring agent"
---

# Alert Manager

Lists, reviews and deletes alert rules. Use when the user asks what alerts they have or wants to clean them up.

## Example requests

- "What alerts do I have?"
- "Delete my old EURUSD alerts."

## Data sources

- `GET /api/v1/alerts`
- `DELETE /api/v1/alerts/{alertId}`

## Workflow

1. Call `GET /api/v1/alerts`, optionally filtered by `status`.
2. Group by symbol and mark duplicates and alerts far from current price.
3. Propose deletions and wait for confirmation; then `DELETE /api/v1/alerts/{alertId}` one at a time.

## Output

- A grouped alert list with flags.
- What was deleted, after confirmation.

## Avoid

- Deleting without explicit confirmation of each alert.
- Deleting by symbol when the user named one alert.

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
