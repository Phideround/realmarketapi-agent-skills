---
name: realmarketapi-trade-plan-builder
description: "Writes a complete trade plan with thesis, entry, stop, targets, size and management rules. Use when the user has a direction in mind and wants a plan they can follow."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: trading-strategies
  role: "Trader"
---

# Trade Plan Builder

Writes a complete trade plan with thesis, entry, stop, targets, size and management rules. Use when the user has a direction in mind and wants a plan they can follow.

## Example requests

- "Build a trade plan for a gold long."
- "Plan a EURUSD short for this week."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_price` | `GET /api/v1/price` |
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |
| `get_atr` | `GET /api/v1/indicator/atr` |
| `get_multi_timeframe` | `GET /api/v1/multi-timeframe` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/market-calendar`

## Workflow

1. State the thesis in one sentence and the timeframe it lives on.
2. Define the entry trigger as an observable event, not a feeling.
3. Set the stop from structure plus ATR, then targets, then size from account risk.
4. Add management rules: when to move to break-even, when to take partials, when to exit on time.
5. List what cancels the plan before entry.

## Output

- A plan with thesis, trigger, entry, stop, targets, size, management and cancel conditions.
- Reward to risk and money at risk.

## Avoid

- A plan with a vague trigger.
- Changing the stop after entry without a rule that allows it.

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
