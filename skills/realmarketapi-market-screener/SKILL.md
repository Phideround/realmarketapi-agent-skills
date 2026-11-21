---
name: realmarketapi-market-screener
description: "Queries the Market Screener for symbols matching trend, RSI, volatility and liquidity filters. Use when the user asks to find symbols that meet conditions."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: screening-watchlists
  role: "Portfolio assistant"
---

# Market Screener

Queries the Market Screener for symbols matching trend, RSI, volatility and liquidity filters. Use when the user asks to find symbols that meet conditions.

## Example requests

- "Find uptrending symbols with RSI above 55 on H1."
- "Screen for low-volatility pairs."

## Data sources

- `POST /api/v1/screener/query`

## Workflow

1. Translate the request into the body: `timeFrame`, `trend`, `minRsi`, `maxVolatilityPct`, `minLiquidityScore`, `sortField`, `sortDirection`, `size`.
2. Check the OpenAPI spec for the allowed values of `trend` and `sortField` before sending.
3. Send one `POST /api/v1/screener/query` and present the results as a table.
4. Offer to run a deeper skill on the top results.

## Output

- The filters used and a results table.
- The next step for the top one to three symbols.

## Avoid

- Looping over every symbol with indicator calls instead of one screener query.
- Guessing enum values.

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
