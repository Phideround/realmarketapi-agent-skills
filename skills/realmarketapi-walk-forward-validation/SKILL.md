---
name: realmarketapi-walk-forward-validation
description: "Tests a strategy across rolling train and test windows to check that results survive out of sample. Use when a backtest looks good and the user asks whether it is overfit."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: quant-research
  role: "Quant researcher"
---

# Walk-Forward Validation

Tests a strategy across rolling train and test windows to check that results survive out of sample. Use when a backtest looks good and the user asks whether it is overfit.

## Example requests

- "Is my backtest overfit?"
- "Run a walk-forward test on this strategy."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_history` | `GET /api/v1/history` |

## Workflow

1. Split history into consecutive windows, for example six months of training and two of testing.
2. Optimise parameters on each training window and apply them unchanged to the next test window.
3. Stitch the test results together and compare them with the in-sample results.
4. Report how much performance degrades and how stable the chosen parameters are.

## Output

- Per-window results and the stitched out-of-sample metrics.
- A verdict: robust, fragile or overfit.

## Avoid

- Re-tuning after looking at test results.
- Too few windows to conclude anything.

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
