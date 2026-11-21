---
name: realmarketapi-risk-sentiment-gauge
description: "Scores market-wide risk appetite from indices, the dollar, gold, bitcoin and yen pairs. Use when the user asks whether markets are risk-on or risk-off."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: sessions-macro
  role: "Macro analyst"
---

# Risk Sentiment Gauge

Scores market-wide risk appetite from indices, the dollar, gold, bitcoin and yen pairs. Use when the user asks whether markets are risk-on or risk-off.

## Example requests

- "Risk-on or risk-off today?"
- "How is market sentiment overall?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_sentiment` | `GET /api/v1/indicator/sentiment` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/price/market`

## Workflow

1. Read US500, USTEC, DXY, XAUUSD, BTCUSD and USDJPY from one `GET /api/v1/price/market` call.
2. Score plus one each for indices up, bitcoin up, dollar down, USDJPY up; minus one for the reverse; gold up with indices down counts as risk-off.
3. Add `get_sentiment` on US500 for the Fear and Greed score.
4. Label the total: risk-on, neutral or risk-off.

## Output

- The component table, total score and label.
- What the regime favours.

## Avoid

- Deriving a regime from one asset.
- Treating the label as a forecast.

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
