---
name: realmarketapi-ema-crossover-strategy
description: "Trades the cross of a fast and slow EMA with a trend-strength filter. Use when the user asks for a simple rule-based crossover system."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: trading-strategies
  role: "Trader"
---

# EMA Crossover Strategy

Trades the cross of a fast and slow EMA with a trend-strength filter. Use when the user asks for a simple rule-based crossover system.

## Example requests

- "9/21 EMA cross on EURUSD H1?"
- "Simple crossover system for BTC."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_ema` | `GET /api/v1/indicator/ema` |
| `get_adx` | `GET /api/v1/indicator/adx` |
| `get_atr` | `GET /api/v1/indicator/atr` |

## Workflow

1. Fetch EMA 9 and EMA 21, or the pair the user names.
2. Signal on a closed-bar cross; require ADX above 20.
3. Take longs only above EMA 200, shorts only below.
4. Stop 1.5 ATR; exit on the opposite cross or at 2 times the risk.

## Output

- Current cross state, bars since the cross, and the active signal.
- Stop and exit rule.

## Avoid

- Acting on a cross inside an unfinished candle.
- Running it unfiltered in a range.

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
