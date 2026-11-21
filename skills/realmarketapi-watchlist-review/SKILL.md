---
name: realmarketapi-watchlist-review
description: "Scans every symbol on a watchlist and flags the ones that need attention. Use when the user asks for a review of their watchlist or a morning check."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: screening-watchlists
  role: "Portfolio assistant"
---

# Watchlist Review

Scans every symbol on a watchlist and flags the ones that need attention. Use when the user asks for a review of their watchlist or a morning check.

## Example requests

- "Review my watchlist."
- "Anything happening on my list this morning?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_insight_setup` | `GET /api/v1/insight/setup` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/watchlists`
- `GET /api/v1/price/market`

## Workflow

1. Read the list with `GET /api/v1/watchlists`.
2. Price all symbols with one `GET /api/v1/price/market` call.
3. Flag symbols with a large daily move or sitting near a key level, then run `get_insight_setup` only on those.
4. Sort into act now, watch and nothing to do.

## Output

- A three-group summary with one line per flagged symbol.
- Suggested alerts for the watch group.

## Avoid

- Running full analysis on every symbol.
- Removing symbols without being asked.

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
