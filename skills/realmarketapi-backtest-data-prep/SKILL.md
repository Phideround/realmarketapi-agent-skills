---
name: realmarketapi-backtest-data-prep
description: "Builds a clean, gap-checked candle dataset ready for backtesting. Use when the user is about to test a strategy and needs reliable historical data first."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: quant-research
  role: "Quant researcher"
---

# Backtest Data Preparation

Builds a clean, gap-checked candle dataset ready for backtesting. Use when the user is about to test a strategy and needs reliable historical data first.

## Example requests

- "Prepare two years of EURUSD H1 for backtesting."
- "Clean BTC daily data for my strategy test."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_history` | `GET /api/v1/history` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/me`

## Workflow

1. Confirm the history range the plan allows with `GET /api/v1/me`.
2. Download with `get_history` at `pageSize` 1000 and page to the end.
3. Sort ascending, remove duplicates, enforce UTC, and list gaps beyond normal market closures.
4. Split into in-sample and out-of-sample periods, for example 70 and 30 percent, and save to CSV or Parquet.

## Output

- Dataset files, row counts, date range and a gap report.
- The split boundaries.

## Avoid

- Forward-filling gaps without recording it.
- Testing on the same data used to choose parameters.

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
