---
name: realmarketapi-currency-strength-meter
description: "Scores individual currencies by averaging their moves across all covered pairs. Use when the user asks which currency is strongest or wants the best pair to express a view."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: quant-research
  role: "Quant researcher"
---

# Currency Strength Meter

Scores individual currencies by averaging their moves across all covered pairs. Use when the user asks which currency is strongest or wants the best pair to express a view.

## Example requests

- "Which currency is strongest today?"
- "Best pair to short the yen?"

## Data sources

- `GET /api/v1/price/category`
- `GET /api/v1/price/24hr`

## Workflow

1. Pull all forex pairs in one call.
2. For each currency average the percentage change of every pair it appears in, flipping the sign when it is the quote currency.
3. Rank currencies and pair the strongest with the weakest.
4. Check that the suggested pair is covered and not already overextended.

## Output

- A currency ranking with scores.
- The pair that best expresses strongest versus weakest.

## Avoid

- Scoring from one or two pairs per currency.
- Chasing a pair that already moved several daily ranges.

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
