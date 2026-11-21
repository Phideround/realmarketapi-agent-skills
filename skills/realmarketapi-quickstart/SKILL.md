---
name: realmarketapi-quickstart
description: "Connects an agent to RealMarketAPI over MCP or REST and verifies the connection with a first live call. Use when setting up a new agent, a new API key, or when no RealMarketAPI call has succeeded yet in the session."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: foundations
  role: "Any agent"
---

# Quickstart

Connects an agent to RealMarketAPI over MCP or REST and verifies the connection with a first live call. Use when setting up a new agent, a new API key, or when no RealMarketAPI call has succeeded yet in the session.

## Example requests

- "Set up RealMarketAPI for this agent."
- "Is my RealMarketAPI key working?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_symbols` | `GET /api/v1/symbol` |
| `get_price` | `GET /api/v1/price` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/me`

## Workflow

1. Check whether RealMarketAPI MCP tools are available. If they are, use them; otherwise use REST with the `apiKey` query parameter.
2. Call `GET /api/v1/me` to confirm the key works and to read its plan, symbols and timeframes.
3. Call `get_symbols`, then `get_price` for XAUUSD on M1 as a smoke test.
4. Report the plan and what it unlocks, and name the skills that fit that plan.

## Output

- Connection mode (MCP or REST), plan, quota used, and the smoke-test price with its timestamp.
- A short list of what the plan cannot do.

## Avoid

- Echoing the API key back to the user.
- Assuming MCP is available on a plan below Pro.

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
