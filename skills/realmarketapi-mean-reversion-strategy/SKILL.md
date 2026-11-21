---
name: realmarketapi-mean-reversion-strategy
description: "Trades a return to the mean after a statistical stretch from Bollinger Bands and RSI. Use when the user asks whether a move is overextended enough to fade."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: trading-strategies
  role: "Trader"
---

# Mean Reversion Strategy

Trades a return to the mean after a statistical stretch from Bollinger Bands and RSI. Use when the user asks whether a move is overextended enough to fade.

## Example requests

- "Is this BTC move overextended?"
- "Fade setup on GBPJPY?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_bollinger_bands` | `GET /api/v1/indicator/bollinger-bands` |
| `get_rsi` | `GET /api/v1/indicator/rsi` |
| `get_adx` | `GET /api/v1/indicator/adx` |
| `get_atr` | `GET /api/v1/indicator/atr` |

## Workflow

1. Require a close outside a Bollinger band with RSI beyond 70 or 30.
2. Skip when ADX is above 30 and rising; strong trends stay stretched.
3. Enter when a candle closes back inside the band.
4. Target the middle band; stop beyond the extreme by 1 ATR.

## Output

- Stretch measure, entry trigger, stop and target.
- The trend filter result.

## Avoid

- Fading a band walk in a strong trend.
- Averaging into a losing fade.

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
