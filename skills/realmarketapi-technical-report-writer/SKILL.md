---
name: realmarketapi-technical-report-writer
description: "Writes a structured single-symbol technical report suitable for clients or publication. Use when the user asks for a full written analysis of one instrument."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: reporting-content
  role: "Market reporter"
---

# Technical Report Writer

Writes a structured single-symbol technical report suitable for clients or publication. Use when the user asks for a full written analysis of one instrument.

## Example requests

- "Write a technical report on XAUUSD."
- "Full analysis of EURUSD for my clients."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_price` | `GET /api/v1/price` |
| `get_multi_timeframe` | `GET /api/v1/multi-timeframe` |
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |
| `get_rsi` | `GET /api/v1/indicator/rsi` |
| `get_macd` | `GET /api/v1/indicator/macd` |
| `get_volatility` | `GET /api/v1/volatility` |
| `get_insight_confluence` | `GET /api/v1/insight/confluence` |

## Workflow

1. Collect the data once, then write; do not fetch while writing.
2. Structure: summary, trend, momentum, key levels, volatility, scenarios, risks.
3. Give two scenarios with the level that activates each.
4. Keep every number tied to its timeframe and time.

## Output

- A report of 300 to 500 words with a levels table.
- Bull and bear scenarios with trigger levels.

## Avoid

- One-sided reports with no alternative scenario.
- Indicator lists with no conclusion.

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
