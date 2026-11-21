---
name: realmarketapi-bear-researcher
description: "Builds the strongest evidence-based case for a short position or for staying out. Use inside a debate workflow, or when the user wants a view challenged."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: agent-teams
  role: "Team role"
---

# Bear Researcher

Builds the strongest evidence-based case for a short position or for staying out. Use inside a debate workflow, or when the user wants a view challenged.

## Example requests

- "Make the bear case for bitcoin."
- "Why should I not buy EURUSD here?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_insight_confluence` | `GET /api/v1/insight/confluence` |
| `get_multi_timeframe` | `GET /api/v1/multi-timeframe` |
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |
| `get_manipulation_risk` | `GET /api/v1/manipulation-risk` |
| `get_sentiment` | `GET /api/v1/indicator/sentiment` |

## Workflow

1. Collect evidence for downside or caution: resistance overhead, weakening momentum, greed extremes, elevated risk readings.
2. Rank the points and attach the number behind each.
3. Answer the bull's strongest point directly.
4. State what would make you drop the case.

## Output

- Three to five ranked arguments with data.
- The concession: the level at which the bear case fails.

## Avoid

- Pessimism without evidence.
- Confusing a case for not buying with a case for shorting.

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
