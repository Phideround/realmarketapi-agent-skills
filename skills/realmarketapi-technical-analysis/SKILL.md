---
name: realmarketapi-technical-analysis
description: "Produces a complete technical read of one symbol from trend, momentum, levels and sentiment. Use when the user asks for chart analysis, a technical view or a bias on a symbol."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: technical-analysis
  role: "Technical analyst"
---

# Technical Analysis

Produces a complete technical read of one symbol from trend, momentum, levels and sentiment. Use when the user asks for chart analysis, a technical view or a bias on a symbol.

## Example requests

- "Analyse XAUUSD on H1."
- "Technical view on EURUSD?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_candles` | `GET /api/v1/candle` |
| `get_ema` | `GET /api/v1/indicator/ema` |
| `get_rsi` | `GET /api/v1/indicator/rsi` |
| `get_macd` | `GET /api/v1/indicator/macd` |
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |
| `get_sentiment` | `GET /api/v1/indicator/sentiment` |

## Workflow

1. Establish the trend with `get_ema` at 20 and 50 and the slope of recent candles.
2. Read momentum with `get_rsi` and `get_macd`.
3. Map structure with `get_support_resistance` and place price relative to the nearest levels.
4. Add `get_sentiment` as confirmation or contradiction.
5. Count what agrees and what conflicts, then state the bias and its invalidation.

## Output

- Bias (bullish, bearish or neutral) with a confidence of low, medium or high.
- Key levels, indicator readings and the invalidation level.

## Avoid

- Calling every indicator when four answer the question.
- Stating a bias without an invalidation level.

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
