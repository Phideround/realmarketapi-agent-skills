---
name: realmarketapi-anomaly-detection
description: "Flags sudden price spikes and unusual volume in recent candles. Use when the user asks what just happened, whether a move is abnormal, or as a safety check."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: market-structure
  role: "Market structure analyst"
---

# Anomaly Detection

Flags sudden price spikes and unusual volume in recent candles. Use when the user asks what just happened, whether a move is abnormal, or as a safety check.

## Example requests

- "Why did silver just spike?"
- "Any anomalies on ETHUSD today?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_anomaly` | `GET /api/v1/anomaly` |
| `get_candles` | `GET /api/v1/candle` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/market-calendar`

## Workflow

1. Call `get_anomaly` for the symbol and timeframe.
2. For each anomaly report time, type and magnitude.
3. Check the calendar for a scheduled event at that time.
4. Say whether price has retraced the move or held it.

## Output

- Anomaly list with time, type and size.
- Status: retraced, holding or extending.

## Avoid

- Inventing a news cause.
- Chasing the anomaly bar.

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
