---
name: realmarketapi-stochastic-analysis
description: "Interprets the Stochastic oscillator %K and %D for short-term turning points. Use when the user asks about Stochastic readings or timing inside a range."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: technical-analysis
  role: "Technical analyst"
---

# Stochastic Analysis

Interprets the Stochastic oscillator %K and %D for short-term turning points. Use when the user asks about Stochastic readings or timing inside a range.

## Example requests

- "Stochastic on AUDUSD M15?"
- "Is silver oversold on Stochastic?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_stochastic` | `GET /api/v1/indicator/stochastic` |
| `get_adx` | `GET /api/v1/indicator/adx` |

## Workflow

1. Call `get_stochastic` with defaults 14 and 3.
2. Read zones: above 80 overbought, below 20 oversold.
3. Look for a %K and %D cross inside a zone, then an exit from that zone.
4. Check `get_adx`; trust Stochastic turns mainly when ADX is below 25.

## Output

- %K, %D, zone and whether a valid cross occurred.
- How reliable the signal is given trend strength.

## Avoid

- Fading a strong trend on Stochastic alone.
- Acting before %K leaves the extreme zone.

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
