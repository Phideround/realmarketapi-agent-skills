---
name: realmarketapi-bitcoin-specialist
description: "Analyses BTCUSD as a 24/7 market with weekend behaviour, round-number levels and high volatility. Use when the user asks about bitcoin."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: asset-specialists
  role: "Asset-class specialist"
---

# Bitcoin Specialist

Analyses BTCUSD as a 24/7 market with weekend behaviour, round-number levels and high volatility. Use when the user asks about bitcoin.

## Example requests

- "Bitcoin analysis."
- "Is BTC going to hold this level?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_price` | `GET /api/v1/price` |
| `get_multi_timeframe` | `GET /api/v1/multi-timeframe` |
| `get_liquidity_zones` | `GET /api/v1/liquidity/zones` |
| `get_volatility` | `GET /api/v1/volatility` |
| `get_sentiment` | `GET /api/v1/indicator/sentiment` |

## Workflow

1. Set the trend with `get_multi_timeframe`, weighting D1 and H4.
2. Mark round thousands and `get_liquidity_zones`.
3. Read `get_volatility` and `get_sentiment`; extreme greed late in a run is a warning.
4. Note the time: weekends are thinner and prone to sweeps.

## Output

- Bitcoin bias, levels, volatility regime and sentiment.
- Weekend or thin-liquidity note when relevant.

## Avoid

- Forex-sized stops on bitcoin.
- Claiming on-chain, funding or ETF-flow data; this API does not provide it.

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
