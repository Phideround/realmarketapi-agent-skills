---
name: realmarketapi-manipulation-risk
description: "Reports the current manipulation risk level for a symbol and what drives it. Use when the user asks whether price action is trustworthy or before trading thin conditions."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: market-structure
  role: "Market structure analyst"
---

# Manipulation Risk

Reports the current manipulation risk level for a symbol and what drives it. Use when the user asks whether price action is trustworthy or before trading thin conditions.

## Example requests

- "Is gold being manipulated right now?"
- "Manipulation risk on DOGEUSD?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_manipulation_risk` | `GET /api/v1/manipulation-risk` |
| `get_anomaly` | `GET /api/v1/anomaly` |

## Workflow

1. Call `get_manipulation_risk` and read Low, Medium or High.
2. Add context from `get_anomaly` and the session: thin hours raise the risk.
3. Translate the level into action: Low trade normally, Medium reduce size and avoid market orders at levels, High stand aside.

## Output

- Risk level, the contributing factors and the recommended adjustment.
- When to check again.

## Avoid

- Treating High as proof of wrongdoing; it is a risk estimate.
- Ignoring Medium during low-liquidity hours.

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
