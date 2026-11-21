---
name: realmarketapi-insight-setup
description: "Identifies the current setup type as Breakout, Pullback or Range. Use when the user asks what kind of setup is on the chart or which playbook applies."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: signals-insight
  role: "Signal analyst"
---

# Insight Setup

Identifies the current setup type as Breakout, Pullback or Range. Use when the user asks what kind of setup is on the chart or which playbook applies.

## Example requests

- "What setup is on gold M15?"
- "Is GBPUSD breaking out or ranging?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_insight_setup` | `GET /api/v1/insight/setup` |

## Workflow

1. Call `get_insight_setup` for the symbol and timeframe.
2. Map the setup to a playbook: Breakout to the breakout strategy, Pullback to the pullback strategy, Range to range trading.
3. State the level that defines the setup.

## Output

- Setup type, defining level and the matching playbook skill.
- What would turn it into a different setup.

## Avoid

- Applying a trend playbook to a Range setup.
- Acting before the defining level is tested.

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
