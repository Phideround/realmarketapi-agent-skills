---
name: realmarketapi-sentiment-analysis
description: "Reads trend direction, market sentiment and the Fear and Greed score for a symbol. Use when the user asks about sentiment, fear and greed, or wants to confirm or challenge a technical view."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: signals-insight
  role: "Signal analyst"
---

# Sentiment Analysis

Reads trend direction, market sentiment and the Fear and Greed score for a symbol. Use when the user asks about sentiment, fear and greed, or wants to confirm or challenge a technical view.

## Example requests

- "What is sentiment on bitcoin?"
- "Fear and greed for gold?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_sentiment` | `GET /api/v1/indicator/sentiment` |
| `get_insight_score` | `GET /api/v1/insight/score` |

## Workflow

1. Call `get_sentiment` for the symbol and timeframe.
2. Read the Fear and Greed score: below 25 extreme fear, above 75 extreme greed.
3. Compare with price trend: sentiment extremes against a stretched trend are a contrarian warning; sentiment in line with an early trend is confirmation.

## Output

- Sentiment label, Fear and Greed score and trend direction.
- Whether it confirms or contradicts the technical bias.

## Avoid

- Using sentiment as a standalone entry signal.
- Describing it as survey or social-media data; it is derived from market data.

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
