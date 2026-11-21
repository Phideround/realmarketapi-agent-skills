---
name: realmarketapi-strategy-signal
description: "Retrieves the Signal Lab strategy signal with confidence, risk level, invalidation price and reasons. Use when the user asks for a ready-made trade signal with a defined invalidation."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: signals-insight
  role: "Signal analyst"
---

# Strategy Signal

Retrieves the Signal Lab strategy signal with confidence, risk level, invalidation price and reasons. Use when the user asks for a ready-made trade signal with a defined invalidation.

## Example requests

- "Give me a signal for XAUUSD H1."
- "What does Signal Lab say about BTC?"

## Data sources

- `GET /api/v1/signals/strategy`

## Workflow

1. Call `GET /api/v1/signals/strategy` with `symbolCode` and `timeFrame`.
2. Report `signal`, `confidence`, `riskLevel`, `invalidationPrice` and `reasons` as returned.
3. Compute the distance from current price to the invalidation in percent.
4. Hand off to the validation skill before anyone acts on it.

## Output

- Signal, confidence, risk level, invalidation price and reasons.
- Distance to invalidation.

## Avoid

- Paraphrasing the reasons into something stronger than the API returned.
- Dropping the invalidation price.

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
