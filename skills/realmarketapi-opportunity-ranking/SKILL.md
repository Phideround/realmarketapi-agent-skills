---
name: realmarketapi-opportunity-ranking
description: "Ranks a shortlist of symbols by setup quality using insight score, confluence and risk. Use when the user has several candidates and asks which is best."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: screening-watchlists
  role: "Portfolio assistant"
---

# Opportunity Ranking

Ranks a shortlist of symbols by setup quality using insight score, confluence and risk. Use when the user has several candidates and asks which is best.

## Example requests

- "Which of these five pairs is the best setup?"
- "Rank my watchlist by opportunity."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_insight_score` | `GET /api/v1/insight/score` |
| `get_insight_confluence` | `GET /api/v1/insight/confluence` |
| `get_manipulation_risk` | `GET /api/v1/manipulation-risk` |
| `get_atr` | `GET /api/v1/indicator/atr` |

## Workflow

1. Limit the shortlist to about ten symbols.
2. For each fetch `get_insight_score` and `get_insight_confluence` on the same timeframe.
3. Penalise High `get_manipulation_risk` and setups with poor room to the next level.
4. Rank and explain the top three in one line each.

## Output

- A ranked table with score, signal and risk.
- The top three with reasons.

## Avoid

- Ranking fifty symbols with four calls each.
- Ranking across different timeframes.

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
