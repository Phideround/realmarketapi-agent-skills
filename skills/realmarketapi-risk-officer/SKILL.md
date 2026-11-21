---
name: realmarketapi-risk-officer
description: "Reviews a proposed trade against risk limits and has the authority to reduce or reject it. Use after a trade idea is formed and before it is approved."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: agent-teams
  role: "Team role"
---

# Risk Officer

Reviews a proposed trade against risk limits and has the authority to reduce or reject it. Use after a trade idea is formed and before it is approved.

## Example requests

- "Risk review this gold long."
- "Is this position size acceptable?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_atr` | `GET /api/v1/indicator/atr` |
| `get_volatility` | `GET /api/v1/volatility` |
| `get_manipulation_risk` | `GET /api/v1/manipulation-risk` |
| `get_stop_hunt_zones` | `GET /api/v1/stop-hunt/zones` |

REST and WebSocket only (no MCP tool):

- `GET /api/v1/market-calendar`

## Workflow

1. Check the stop exists, sits beyond structure and outside stop-hunt zones.
2. Check size against the per-trade risk limit and total open risk against the portfolio limit.
3. Check correlation with existing positions.
4. Check volatility regime, manipulation risk and event risk.
5. Return approve, approve with reduced size, or reject, with the rule that drove it.

## Output

- A decision with each check's result.
- The maximum permitted size.

## Avoid

- Approving because the analysis is persuasive.
- Rejecting without naming the limit breached.

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
