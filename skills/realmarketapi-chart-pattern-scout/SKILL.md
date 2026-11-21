---
name: realmarketapi-chart-pattern-scout
description: "Looks for classical chart structures such as double tops and bottoms, triangles, flags and head and shoulders in candle data. Use when the user asks whether a chart pattern is forming."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: technical-analysis
  role: "Technical analyst"
---

# Chart Pattern Scout

Looks for classical chart structures such as double tops and bottoms, triangles, flags and head and shoulders in candle data. Use when the user asks whether a chart pattern is forming.

## Example requests

- "Is there a double top on US500?"
- "Any pattern forming on SOLUSD H4?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_candles` | `GET /api/v1/candle` |
| `get_history` | `GET /api/v1/history` |

## Workflow

1. Pull 100 to 200 candles and mark swing highs and lows.
2. Test swing geometry: equal highs or lows, converging trendlines, a pole followed by a tight channel, three peaks with a higher middle.
3. Give the neckline or breakout level and the measured-move target.
4. Label each as forming, confirmed or failed, and say this is an approximation from candle data.

## Output

- Pattern candidates with their defining levels and status.
- Breakout level and measured target.

## Avoid

- Presenting an unconfirmed pattern as a signal.
- Forcing a pattern onto random swings.

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
