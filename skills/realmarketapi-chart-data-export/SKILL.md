---
name: realmarketapi-chart-data-export
description: "Prepares candle and indicator data in the shape a charting library or spreadsheet expects. Use when the user wants to plot data or hand it to another tool."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: reporting-content
  role: "Market reporter"
---

# Chart Data Export

Prepares candle and indicator data in the shape a charting library or spreadsheet expects. Use when the user wants to plot data or hand it to another tool.

## Example requests

- "Give me XAUUSD H1 candles for Lightweight Charts."
- "Export BTC daily with a 50 SMA to CSV."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_candles` | `GET /api/v1/candle` |
| `get_history` | `GET /api/v1/history` |
| `get_sma` | `GET /api/v1/indicator/sma` |
| `get_bollinger_bands` | `GET /api/v1/indicator/bollinger-bands` |

## Workflow

1. Ask for or infer the target: Lightweight Charts, Chart.js, Plotly, a spreadsheet or CSV.
2. Fetch candles and any overlays, sorted ascending.
3. Convert time to what the target needs (Unix seconds, ISO string or date) and name the fields accordingly.
4. Join overlays on `openTime` and leave warm-up rows empty rather than zero.

## Output

- Data in the target format plus a minimal snippet that renders it.
- Row count and time range.

## Avoid

- Descending order for a library that requires ascending.
- Zeros in indicator warm-up rows.

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
