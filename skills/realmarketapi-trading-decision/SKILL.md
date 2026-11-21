---
name: realmarketapi-trading-decision
description: "Turns context, analysis and risk into a final bias with entry zone, invalidation, targets and confidence. Use at the end of an analysis chain when the user asks what to do."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: signals-insight
  role: "Signal analyst"
---

# Trading Decision

Turns context, analysis and risk into a final bias with entry zone, invalidation, targets and confidence. Use at the end of an analysis chain when the user asks what to do.

## Example requests

- "Should I buy or sell gold now?"
- "Final call on BTCUSD H4."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_price` | `GET /api/v1/price` |
| `get_insight_confluence` | `GET /api/v1/insight/confluence` |
| `get_multi_timeframe` | `GET /api/v1/multi-timeframe` |
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |
| `get_atr` | `GET /api/v1/indicator/atr` |
| `get_manipulation_risk` | `GET /api/v1/manipulation-risk` |

## Workflow

1. Gather the outputs of the context, analysis and risk skills already run; fetch only what is missing.
2. Decide: long, short or stand aside. Stand aside when timeframes conflict or risk checks fail.
3. Define entry zone, invalidation (structure plus ATR buffer) and two targets.
4. Set confidence from the number of independent factors in agreement.
5. Write the decision in under ten lines, then the single biggest risk to it.

## Output

- Decision, entry zone, invalidation, targets, reward to risk, confidence.
- The main risk and the condition that cancels the plan.

## Avoid

- Forcing a trade when the honest answer is stand aside.
- A decision without an invalidation level.

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
