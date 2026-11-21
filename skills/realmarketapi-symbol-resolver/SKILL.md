---
name: realmarketapi-symbol-resolver
description: "Maps everyday instrument names such as gold, bitcoin, cable or the S&P 500 to exact RealMarketAPI symbol codes. Use when the user names an asset in plain language or uses a broker-specific ticker."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: foundations
  role: "Any agent"
---

# Symbol Resolver

Maps everyday instrument names such as gold, bitcoin, cable or the S&P 500 to exact RealMarketAPI symbol codes. Use when the user names an asset in plain language or uses a broker-specific ticker.

## Example requests

- "What is the symbol for the Nasdaq?"
- "Get me the price of Brent crude."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_symbols` | `GET /api/v1/symbol` |

## Workflow

1. Call `get_symbols` and match the user's wording against `symbolCode` and `displayName`.
2. Apply common aliases: gold XAUUSD, silver XAGUSD, cable GBPUSD, dollar index DXY, WTI USOIL, Brent UKOIL, S&P 500 US500, Dow US30, Nasdaq USTEC, DAX DE30.
3. If more than one symbol fits, list the candidates with their market class and ask which one is meant.
4. If nothing matches, say the symbol is not covered and offer the nearest covered proxy.

## Output

- The resolved `symbolCode`, display name and market class.
- Alternatives when the match is ambiguous.

## Avoid

- Guessing codes such as BTCUSDT or GOLD without checking the symbol list.
- Silently swapping to a proxy without telling the user.

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
