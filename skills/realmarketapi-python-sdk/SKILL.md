---
name: realmarketapi-python-sdk
description: "Uses the realmarketapi-python-sdk-beta PyPI package for REST and WebSocket access. Use when integrating from Python scripts, notebooks or services."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: developer-integration
  role: "Coding agent"
---

# Python SDK

Uses the realmarketapi-python-sdk-beta PyPI package for REST and WebSocket access. Use when integrating from Python scripts, notebooks or services.

## Example requests

- "Get gold candles into pandas."
- "Python example for the price stream."

## Data sources

- `GET /api/v1/price`
- `GET /api/v1/candle`
- `GET /api/v1/history`
- `wss://api.realmarketapi.com/price`

## Workflow

1. Install with `pip install realmarketapi-python-sdk-beta` on Python 3.9 or later.
2. Import `RealMarketApiClient` from `realmarketapi_sdk`, create it with `api_key` from the environment, and close it when done.
3. Call `get_price`, `get_candles`, `get_history`, `get_symbols` and `get_sma`; use `RealMarketApiWebSocket` with asyncio for streams.
4. The beta SDK covers a subset of the API; use `httpx` against REST for the rest, and check the README for the current list.

## Output

- A script or notebook cell that fetches and prints data.
- Conversion to a pandas DataFrame when analysis follows.

## Avoid

- Hardcoding the key in a notebook.
- Leaving the client unclosed.

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
