---
name: realmarketapi-watchlist-builder
description: "Creates a watchlist and adds symbols to it through the Watchlist Hub. Use when the user asks to create, name or fill a watchlist."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: screening-watchlists
  role: "Portfolio assistant"
---

# Watchlist Builder

Creates a watchlist and adds symbols to it through the Watchlist Hub. Use when the user asks to create, name or fill a watchlist.

## Example requests

- "Create a watchlist called Metals with gold and silver."
- "Add NVDA and AMD to my tech list."

## Data sources

- `GET /api/v1/watchlists`
- `POST /api/v1/watchlists`
- `POST /api/v1/watchlists/{watchlistId}/items`

## Workflow

1. List existing watchlists first to avoid a duplicate.
2. Confirm the name and symbols with the user, then `POST /api/v1/watchlists` with a fresh `idempotencyKey`, `name`, `tags` and `notes`.
3. Add each symbol with `POST /api/v1/watchlists/{watchlistId}/items`, each with its own `idempotencyKey` and `order`.
4. Read the list back and confirm the result.

## Output

- The watchlist id, name and final contents.
- Any symbol that could not be added and why.

## Avoid

- Creating or changing a watchlist without the user's confirmation.
- Reusing an idempotency key for a different request.

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
