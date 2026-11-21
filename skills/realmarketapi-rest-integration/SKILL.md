---
name: realmarketapi-rest-integration
description: "Integrates the RealMarketAPI REST API into an application with correct auth, conventions and error handling. Use when writing or reviewing code that calls the REST endpoints directly."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: developer-integration
  role: "Coding agent"
---

# REST Integration

Integrates the RealMarketAPI REST API into an application with correct auth, conventions and error handling. Use when writing or reviewing code that calls the REST endpoints directly.

## Example requests

- "Add RealMarketAPI prices to my Node backend."
- "Write a Go client for the candle endpoint."

## Data sources

- `GET /api/v1/price`
- `GET /api/v1/candle`
- `GET /api/v1/history`
- `GET /api/v1/me`

## Workflow

1. Read the key from an environment variable and send it as the `apiKey` query parameter, never as a header and never from browser code.
2. Use camelCase query parameters and parse camelCase JSON; list responses are `{ data, totalCount }`.
3. Handle `application/problem+json` errors by `errors[].errorCode`; retry only 429 and 5xx with backoff.
4. Set a request timeout and page history with `pageSize` up to 1000.
5. Prefer the OpenAPI spec for exact schemas instead of guessing fields.

## Output

- Working client code with typed responses and error handling.
- A smoke test that calls `/me` and `/price`.

## Avoid

- Shipping the API key to a browser or committing it.
- Assuming header-based auth.

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
