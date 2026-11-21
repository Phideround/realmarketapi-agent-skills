---
name: realmarketapi-cci-analysis
description: "Interprets the Commodity Channel Index for momentum bursts and extremes. Use when the user asks about CCI or wants a momentum trigger for commodities and indices."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: technical-analysis
  role: "Technical analyst"
---

# CCI Analysis

Interprets the Commodity Channel Index for momentum bursts and extremes. Use when the user asks about CCI or wants a momentum trigger for commodities and indices.

## Example requests

- "CCI on XAGUSD H1?"
- "Is momentum extreme on DE30?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_cci` | `GET /api/v1/indicator/cci` |

## Workflow

1. Call `get_cci` with period 20.
2. Read zones: above +100 strong upside momentum, below -100 strong downside, beyond 200 extreme.
3. Treat a cross of the zero line as a momentum shift and a return inside 100 as momentum fading.

## Output

- CCI value, zone and the last zero-line or 100-line cross.
- Momentum read in one line.

## Avoid

- Treating +100 as an automatic sell.
- Comparing CCI values across timeframes.

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
