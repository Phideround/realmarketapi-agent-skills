---
name: realmarketapi-indicator-confluence
description: "Scores how many independent technical factors agree on direction. Use when the user asks how strong a setup is or wants a confluence check before acting."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: technical-analysis
  role: "Technical analyst"
---

# Indicator Confluence

Scores how many independent technical factors agree on direction. Use when the user asks how strong a setup is or wants a confluence check before acting.

## Example requests

- "How strong is the buy setup on XAUUSD?"
- "Confluence check for EURUSD H1 short."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_insight_confluence` | `GET /api/v1/insight/confluence` |
| `get_ema` | `GET /api/v1/indicator/ema` |
| `get_rsi` | `GET /api/v1/indicator/rsi` |
| `get_macd` | `GET /api/v1/indicator/macd` |
| `get_adx` | `GET /api/v1/indicator/adx` |
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |

## Workflow

1. Call `get_insight_confluence` for the combined Buy, Sell or Neutral signal.
2. Build your own tally across four independent families: trend, momentum, strength, structure.
3. Count one vote per family, not per indicator.
4. Compare your tally with the API signal and explain any difference.

## Output

- Confluence score out of four with the vote per family.
- Agreement or disagreement with the API signal.

## Avoid

- Counting RSI, Stochastic and CCI as three votes.
- Calling two of four a strong setup.

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
