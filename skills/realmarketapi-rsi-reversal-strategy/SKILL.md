---
name: realmarketapi-rsi-reversal-strategy
description: "Trades reversals from RSI extremes that are backed by divergence and a level. Use when the user asks for an oversold bounce or overbought fade with rules."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: trading-strategies
  role: "Trader"
---

# RSI Reversal Strategy

Trades reversals from RSI extremes that are backed by divergence and a level. Use when the user asks for an oversold bounce or overbought fade with rules.

## Example requests

- "Oversold bounce on XAGUSD?"
- "RSI reversal setup on AUDUSD."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_rsi` | `GET /api/v1/indicator/rsi` |
| `get_candles` | `GET /api/v1/candle` |
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |
| `get_atr` | `GET /api/v1/indicator/atr` |

## Workflow

1. Require RSI below 30 or above 70 at a support or resistance zone.
2. Look for divergence between the last two swings.
3. Enter when RSI crosses back through 30 or 70 on a closed bar with a rejection candle.
4. Stop beyond the swing by 0.5 ATR; target the midpoint of the prior leg.

## Output

- Setup status, entry, stop and target.
- Which of the three conditions are met.

## Avoid

- Entering while RSI is still falling.
- Taking it against a strong higher-timeframe trend.

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
