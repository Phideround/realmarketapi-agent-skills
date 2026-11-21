---
name: realmarketapi-volatility-regime
description: "Classifies current volatility as low, normal or high from ATR percent and Bollinger width. Use when the user asks how volatile a symbol is or before choosing stop distance and position size."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: risk-volatility
  role: "Risk manager"
---

# Volatility Regime

Classifies current volatility as low, normal or high from ATR percent and Bollinger width. Use when the user asks how volatile a symbol is or before choosing stop distance and position size.

## Example requests

- "How volatile is gold right now?"
- "Volatility regime on BTCUSD H1?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_volatility` | `GET /api/v1/volatility` |
| `get_atr` | `GET /api/v1/indicator/atr` |

## Workflow

1. Call `get_volatility` for the ATR, ATR percent and Bollinger width series.
2. Rank the latest value against the series: bottom third low, top third high.
3. Note the direction: expanding or contracting over the last ten bars.
4. Translate it into action: widen stops and cut size in high volatility; expect expansion after long compression.

## Output

- Regime label, ATR percent and trend of volatility.
- Sizing and stop implication.

## Avoid

- Using a fixed pip stop regardless of regime.
- Calling volatility high from one large candle.

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
