---
name: realmarketapi-value-at-risk
description: "Estimates historical one-day value at risk and expected shortfall for a position or small portfolio. Use when the user asks how much could be lost on a bad day."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: risk-volatility
  role: "Risk manager"
---

# Value at Risk

Estimates historical one-day value at risk and expected shortfall for a position or small portfolio. Use when the user asks how much could be lost on a bad day.

## Example requests

- "What is my 1-day VaR on 2 BTC?"
- "How bad is a 1-in-100 day for this portfolio?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_history` | `GET /api/v1/history` |
| `get_price` | `GET /api/v1/price` |

## Workflow

1. Pull at least 250 D1 candles per symbol and compute daily returns.
2. Build portfolio returns from position weights.
3. Read the 5th and 1st percentile for 95% and 99% VaR; average the returns beyond them for expected shortfall.
4. Convert to money using current position value.

## Output

- 95% and 99% one-day VaR and expected shortfall in money and percent.
- The window used and the worst day in it.

## Avoid

- Presenting VaR as the maximum loss.
- Computing it on a short history.

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
