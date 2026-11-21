---
name: realmarketapi-plan-and-quota-check
description: "Reads the plan, allowed symbols, timeframes, history range and request usage for an API key and adapts the workflow to them. Use before a large batch of calls or when a request is rejected for plan or quota reasons."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: foundations
  role: "Any agent"
---

# Plan and Quota Check

Reads the plan, allowed symbols, timeframes, history range and request usage for an API key and adapts the workflow to them. Use before a large batch of calls or when a request is rejected for plan or quota reasons.

## Example requests

- "How much of my RealMarketAPI quota is left?"
- "Can my plan pull H4 indicators for NVDA?"

## Data sources

- `GET /api/v1/me`

## Workflow

1. Call `GET /api/v1/me` and read `planCode`, `requestCount`, `requestLimit`, `usagePercentage`, `symbols`, `timeframes`, `isSocketSupport` and `historicalRangeMonth`.
2. Compare the planned work against those limits: symbol, timeframe, history depth and number of calls.
3. If something is out of plan, propose the closest in-plan alternative (another timeframe, a shorter range, fewer symbols).
4. Warn when usage is above 80% and estimate how many calls the task needs.

## Output

- Plan summary, usage percentage, and a go or adjust verdict for the planned task.
- The upgrade that would unlock a blocked feature, stated once and factually.

## Avoid

- Retrying a plan-gated call hoping it will pass.
- Burning quota on calls the plan check already ruled out.

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
