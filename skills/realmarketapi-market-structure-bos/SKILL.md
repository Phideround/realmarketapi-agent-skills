---
name: realmarketapi-market-structure-bos
description: "Labels swing structure, breaks of structure and changes of character from candle data. Use when the user asks about market structure, BOS, CHoCH or higher highs and lower lows."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: market-structure
  role: "Market structure analyst"
---

# Market Structure: BOS and CHoCH

Labels swing structure, breaks of structure and changes of character from candle data. Use when the user asks about market structure, BOS, CHoCH or higher highs and lower lows.

## Example requests

- "Has EURUSD broken structure on H1?"
- "Market structure on gold H4?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_candles` | `GET /api/v1/candle` |
| `get_multi_timeframe` | `GET /api/v1/multi-timeframe` |

## Workflow

1. Mark swing highs and lows in `get_candles` using a three-bar pivot rule.
2. Label the sequence HH, HL, LH, LL.
3. A close beyond the last swing in the trend direction is a break of structure; a close beyond the last counter-swing is a change of character.
4. Check `get_multi_timeframe` so a lower-timeframe change is read inside the higher trend.

## Output

- Current structure, the last BOS or CHoCH with price and time.
- The swing that must hold for the structure to remain valid.

## Avoid

- Counting a wick through a swing as a break; require a close.
- Calling every minor pivot a structural swing.

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
