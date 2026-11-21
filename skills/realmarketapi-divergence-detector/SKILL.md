---
name: realmarketapi-divergence-detector
description: "Finds regular and hidden divergence between price swings and RSI or MACD. Use when the user asks about divergence or early signs that a move is weakening."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: technical-analysis
  role: "Technical analyst"
---

# Divergence Detector

Finds regular and hidden divergence between price swings and RSI or MACD. Use when the user asks about divergence or early signs that a move is weakening.

## Example requests

- "Any divergence on gold H1?"
- "Is there bearish divergence on BTC daily?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_candles` | `GET /api/v1/candle` |
| `get_rsi` | `GET /api/v1/indicator/rsi` |
| `get_macd` | `GET /api/v1/indicator/macd` |

## Workflow

1. Identify the last two swing highs and lows in `get_candles`.
2. Read RSI and MACD histogram at the same bars.
3. Regular bearish: higher price high with lower indicator high. Regular bullish: lower low with higher indicator low. Hidden divergence is the reverse and favours continuation.
4. Require at least five bars between swings and confirm on both indicators where possible.

## Output

- Divergence type, the two swing points and the indicator values.
- Whether it is confirmed by price yet.

## Avoid

- Calling divergence on noise between adjacent bars.
- Trading divergence before price confirms.

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
