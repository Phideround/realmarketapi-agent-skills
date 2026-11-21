---
name: realmarketapi-news-event-strategy
description: "Plans around a scheduled high-impact event: stand aside, trade the reaction, or trade the retrace. Use when a major release is due and the user asks how to handle it."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: trading-strategies
  role: "Trader"
---

# News Event Strategy

Plans around a scheduled high-impact event: stand aside, trade the reaction, or trade the retrace. Use when a major release is due and the user asks how to handle it.

## Example requests

- "NFP is today, how do I trade gold?"
- "Plan for the FOMC decision."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_volatility_spikes` | `GET /api/v1/volatility/spikes` |
| `get_atr` | `GET /api/v1/indicator/atr` |
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/market-calendar`

## Workflow

1. Read the event time from `GET /api/v1/market-calendar` and convert it to the user's timezone.
2. Before the event: reduce or close exposure in the affected currency and mark levels on both sides.
3. After the release: wait for the first M5 or M15 candle to close, then trade the break of its range or the retrace to the pre-event level.
4. Use half size and a stop of at least 1.5 times the pre-event ATR.

## Output

- Event, time, affected symbols and the chosen approach.
- Levels and size adjustment.

## Avoid

- Entering seconds before the release.
- Forecasting the data; this API provides the schedule, not the numbers.

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
