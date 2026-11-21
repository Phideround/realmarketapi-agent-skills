---
name: realmarketapi-fair-value-gaps
description: "Finds three-candle price imbalances that have not been filled. Use when the user asks about fair value gaps, FVGs or imbalance entries."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: market-structure
  role: "Market structure analyst"
---

# Fair Value Gaps

Finds three-candle price imbalances that have not been filled. Use when the user asks about fair value gaps, FVGs or imbalance entries.

## Example requests

- "Any FVGs on XAUUSD M15?"
- "Unfilled imbalances on BTC H1?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_candles` | `GET /api/v1/candle` |
| `get_orderflow_imbalance` | `GET /api/v1/orderflow/imbalance` |

## Workflow

1. Scan `get_candles` for three-bar sequences where bar one's high is below bar three's low (bullish gap) or the reverse (bearish gap).
2. Keep gaps larger than about 0.3 ATR and mark each as open, partly filled or filled.
3. Cross-check with imbalance zones from `get_orderflow_imbalance`.
4. Report the nearest open gap on each side of price.

## Output

- Open gaps with range, direction, time and fill status.
- The nearest gap in the direction of the trend.

## Avoid

- Listing tiny gaps on M1.
- Treating a gap as an entry without a trigger.

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
