---
name: realmarketapi-error-recovery
description: "Diagnoses failed RealMarketAPI calls from the problem+json body and chooses the right recovery. Use when a call returns a 4xx or 5xx status, an empty data array, or a tool error."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: foundations
  role: "Any agent"
---

# Error Recovery

Diagnoses failed RealMarketAPI calls from the problem+json body and chooses the right recovery. Use when a call returns a 4xx or 5xx status, an empty data array, or a tool error.

## Example requests

- "Why did my RealMarketAPI request fail?"
- "I am getting 403 on the RSI endpoint."

## Data sources

- `GET /api/v1/health`
- `GET /api/v1/me`

## Workflow

1. Read `statusCode`, `message` and `errors[].errorCode` (for example `ERR_0005_INVALID_API_KEY`). Quote the code, never the key.
2. 401 or an invalid-key code: stop and ask for a valid key. 403 or a plan code: run the plan check and switch to an in-plan alternative.
3. 429 or a quota code: back off exponentially starting at 1 second, with at most three retries, then report.
4. 5xx: call `GET /api/v1/health` once. If it is unhealthy, stop and tell the user; do not loop.
5. Empty `data`: check the symbol code, the timeframe and whether the market is closed before treating it as an error.

## Output

- What failed, the error code, the cause in plain words, and the action taken.
- Whether the final answer is complete or partial.

## Avoid

- Retrying 4xx errors unchanged.
- Hiding a failed call and presenting partial data as complete.

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
