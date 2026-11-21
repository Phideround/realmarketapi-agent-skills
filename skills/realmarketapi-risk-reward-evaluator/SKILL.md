---
name: realmarketapi-risk-reward-evaluator
description: "Computes reward-to-risk for a proposed entry, stop and target and the win rate needed to break even. Use when the user gives trade levels and asks whether the trade is worth taking."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: risk-volatility
  role: "Risk manager"
---

# Risk-Reward Evaluator

Computes reward-to-risk for a proposed entry, stop and target and the win rate needed to break even. Use when the user gives trade levels and asks whether the trade is worth taking.

## Example requests

- "Entry 1.0850, stop 1.0820, target 1.0920. Good trade?"
- "Is 1:2 realistic here?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_price` | `GET /api/v1/price` |
| `get_atr` | `GET /api/v1/indicator/atr` |

## Workflow

1. Take entry, stop and target; if entry is missing use the live price.
2. Compute risk, reward and the ratio. Break-even win rate equals 1 / (1 + ratio).
3. Check realism: stop under 1 ATR is likely noise; target over 3 ATR may not be reached in the timeframe.

## Output

- Reward to risk, break-even win rate, and a verdict.
- Which level to adjust if the ratio is below 1.5.

## Avoid

- Moving the stop closer just to improve the ratio.
- Ignoring spread on small targets.

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
