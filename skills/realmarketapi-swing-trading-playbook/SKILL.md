---
name: realmarketapi-swing-trading-playbook
description: "Runs a multi-day routine with D1 trend, H4 setups and H1 timing. Use when the user wants trades held for days to a few weeks."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: trading-strategies
  role: "Trader"
---

# Swing Trading Playbook

Runs a multi-day routine with D1 trend, H4 setups and H1 timing. Use when the user wants trades held for days to a few weeks.

## Example requests

- "Swing trade idea on XAUUSD."
- "Is there a swing long on NVDA?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_multi_timeframe` | `GET /api/v1/multi-timeframe` |
| `get_ema` | `GET /api/v1/indicator/ema` |
| `get_fibonacci` | `GET /api/v1/indicator/fibonacci` |
| `get_support_resistance` | `GET /api/v1/indicator/support-resistance` |
| `get_atr` | `GET /api/v1/indicator/atr` |

## Workflow

1. Confirm the D1 trend with `get_multi_timeframe` and EMA 50.
2. On H4 wait for a pullback into the 38.2 to 61.8 zone from `get_fibonacci` or a major level.
3. Time the entry on H1 with a structure break back in the trend direction.
4. Stop beyond the pullback extreme plus 0.5 ATR on H4; targets at the prior swing and the 127.2 extension.

## Output

- Trend, pullback zone, entry trigger, stop and targets.
- Expected holding time and the weekend-gap note.

## Avoid

- Entering mid-swing without a pullback.
- Stops sized for an intraday trade.

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
