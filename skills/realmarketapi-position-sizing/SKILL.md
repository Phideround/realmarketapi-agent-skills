---
name: realmarketapi-position-sizing
description: "Calculates position size from account balance, risk percentage and stop distance. Use when the user asks how much to trade or how many lots, units or shares to take."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: risk-volatility
  role: "Risk manager"
---

# Position Sizing

Calculates position size from account balance, risk percentage and stop distance. Use when the user asks how much to trade or how many lots, units or shares to take.

## Example requests

- "How many lots of XAUUSD with a $5,000 account and 1% risk?"
- "Position size for EURUSD with a 25 pip stop."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_price` | `GET /api/v1/price` |
| `get_cross_price` | `GET /api/v1/price/cross` |
| `get_atr` | `GET /api/v1/indicator/atr` |

## Workflow

1. Collect account balance, account currency, risk percent (default 1%) and the stop level or stop distance.
2. If no stop is given, propose 1.5 times `get_atr` on the execution timeframe.
3. Size equals account risk divided by stop distance times value per unit. For forex convert pip value into the account currency using a live `get_price`, or `get_cross_price` when no listed pair joins the quote and account currencies (for example a JPY-quoted pair in a VND account).
4. Round down to the instrument's lot step and show the money at risk at that size.

## Output

- Position size, stop distance, money at risk and percent of account.
- The assumptions: contract size, pip value, conversion rate.

## Avoid

- Sizing without a stop.
- Assuming a contract size; ask or state the assumption, since it varies by broker.

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
