---
name: realmarketapi-adx-trend-strength
description: "Measures trend strength and directional dominance with ADX, +DI and -DI. Use when the user asks how strong a trend is or whether to use trend or range tactics."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: technical-analysis
  role: "Technical analyst"
---

# ADX Trend Strength

Measures trend strength and directional dominance with ADX, +DI and -DI. Use when the user asks how strong a trend is or whether to use trend or range tactics.

## Example requests

- "How strong is the trend on USOIL?"
- "Should I use range or trend tactics on EURUSD?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_adx` | `GET /api/v1/indicator/adx` |

## Workflow

1. Call `get_adx` with period 14.
2. Classify ADX: below 20 no trend, 20 to 25 emerging, 25 to 40 strong, above 40 very strong and possibly late.
3. Read direction from +DI against -DI and note whether ADX is rising or falling.
4. Recommend the tactic family: trend following when rising above 25, range tactics when below 20.

## Output

- ADX, +DI, -DI, strength label and direction.
- Suggested tactic family.

## Avoid

- Reading ADX as direction; it measures strength only.
- Ignoring a falling ADX in a mature trend.

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
