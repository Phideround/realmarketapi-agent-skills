---
name: realmarketapi-market-regime-classifier
description: "Classifies a symbol as trending, ranging, volatile or quiet and names the tactics that fit. Use before choosing a strategy or when a strategy has stopped working."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: sessions-macro
  role: "Macro analyst"
---

# Market Regime Classifier

Classifies a symbol as trending, ranging, volatile or quiet and names the tactics that fit. Use before choosing a strategy or when a strategy has stopped working.

## Example requests

- "What regime is EURUSD in?"
- "Why did my breakout strategy stop working on gold?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_adx` | `GET /api/v1/indicator/adx` |
| `get_volatility` | `GET /api/v1/volatility` |
| `get_insight_setup` | `GET /api/v1/insight/setup` |
| `get_multi_timeframe` | `GET /api/v1/multi-timeframe` |

## Workflow

1. Trend strength from `get_adx`; volatility regime from `get_volatility`.
2. Combine: trending and quiet, trending and volatile, ranging and quiet, ranging and volatile.
3. Cross-check with `get_insight_setup` and `get_multi_timeframe`.
4. Map to tactics: trend following, breakout with reduced size, range fades, or stand aside.

## Output

- Regime label with the two measurements behind it.
- The matching strategy skill and the one to avoid.

## Avoid

- Running one strategy in every regime.
- Classifying from the last few bars only.

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
