---
name: realmarketapi-momentum-oscillator-consensus
description: "Polls RSI, Stochastic, CCI and Williams %R and reports whether they agree. Use when the user asks if a symbol is overbought or oversold and wants more than one oscillator."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: technical-analysis
  role: "Technical analyst"
---

# Momentum Oscillator Consensus

Polls RSI, Stochastic, CCI and Williams %R and reports whether they agree. Use when the user asks if a symbol is overbought or oversold and wants more than one oscillator.

## Example requests

- "Is USDJPY overbought?"
- "Oscillator check on ETHUSD H1."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_rsi` | `GET /api/v1/indicator/rsi` |
| `get_stochastic` | `GET /api/v1/indicator/stochastic` |
| `get_cci` | `GET /api/v1/indicator/cci` |
| `get_williams_r` | `GET /api/v1/indicator/williams-r` |

## Workflow

1. Fetch all four oscillators on the same timeframe.
2. Score each as overbought, oversold or neutral using its standard thresholds.
3. Report the vote, for example three of four oversold.
4. Downgrade the conclusion when the trend is strong against it.

## Output

- A four-row table of reading and vote, plus the consensus.
- Reliability note based on trend.

## Avoid

- Counting four correlated oscillators as four independent confirmations.
- Overriding the trend with an oscillator vote.

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
