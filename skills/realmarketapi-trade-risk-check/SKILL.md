---
name: realmarketapi-trade-risk-check
description: "Runs a pre-trade checklist across manipulation risk, anomalies, volatility and scheduled events. Use immediately before entering a trade or approving a signal."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: risk-volatility
  role: "Risk manager"
---

# Pre-Trade Risk Check

Runs a pre-trade checklist across manipulation risk, anomalies, volatility and scheduled events. Use immediately before entering a trade or approving a signal.

## Example requests

- "Is it safe to enter XAUUSD now?"
- "Risk check before I short BTC."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_manipulation_risk` | `GET /api/v1/manipulation-risk` |
| `get_anomaly` | `GET /api/v1/anomaly` |
| `get_volatility` | `GET /api/v1/volatility` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/market-calendar`

## Workflow

1. Call `get_manipulation_risk`; High means stand aside or halve size.
2. Call `get_anomaly` for sudden spikes or unusual volume in recent bars.
3. Check `get_volatility` for the regime.
4. Check `GET /api/v1/market-calendar` for high-impact events in the next few hours.
5. Return pass, caution or block with the reason for each failed item.

## Output

- A checklist with a result per item and an overall verdict.
- The size adjustment that goes with a caution.

## Avoid

- Skipping the check because the setup looks good.
- Blocking on a single mild warning.

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
