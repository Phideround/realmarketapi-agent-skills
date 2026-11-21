---
name: realmarketapi-event-risk-filter
description: "Decides whether a planned trade falls inside a no-trade window around a scheduled event. Use before entering a trade or when scheduling automated strategies."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: sessions-macro
  role: "Macro analyst"
---

# Event Risk Filter

Decides whether a planned trade falls inside a no-trade window around a scheduled event. Use before entering a trade or when scheduling automated strategies.

## Example requests

- "Can I enter EURUSD now or is news coming?"
- "Is it safe to run my bot this afternoon?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_volatility_spikes` | `GET /api/v1/volatility/spikes` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/market-calendar`

## Workflow

1. Find high-impact events for the trade's currencies within its expected holding time.
2. Apply a window: no new entries from 30 minutes before to 15 minutes after for intraday trades.
3. Use past `get_volatility_spikes` to show how violent similar hours have been.
4. Return clear, wait until a stated time, or reduce size.

## Output

- Verdict with the event and the time the window ends.
- Size or stop adjustment if trading anyway.

## Avoid

- Blocking swing trades for every minor release.
- Ignoring events in the quote currency.

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
