---
name: realmarketapi-signal-validation
description: "Cross-checks a trade signal from any source against independent data and risk conditions. Use when the user brings a signal or an idea and asks whether it holds up."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: signals-insight
  role: "Signal analyst"
---

# Signal Validation

Cross-checks a trade signal from any source against independent data and risk conditions. Use when the user brings a signal or an idea and asks whether it holds up.

## Example requests

- "Someone told me to buy gold at 2,640. Valid?"
- "Check this EURUSD short signal."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_insight_confluence` | `GET /api/v1/insight/confluence` |
| `get_multi_timeframe` | `GET /api/v1/multi-timeframe` |
| `get_manipulation_risk` | `GET /api/v1/manipulation-risk` |
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/market-calendar`

## Workflow

1. Restate the signal: symbol, direction, timeframe, entry, stop, target.
2. Check direction against `get_insight_confluence` and `get_multi_timeframe`.
3. Check that the entry is not directly under resistance for a long or above support for a short.
4. Check `get_manipulation_risk` and the calendar for the next few hours.
5. Return confirmed, weak or rejected, with the failed checks.

## Output

- Verdict with a line per check.
- What would upgrade a weak signal.

## Avoid

- Validating a signal with the same input that produced it.
- Confirming a signal that has no stop.

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
