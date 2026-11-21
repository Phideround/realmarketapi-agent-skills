---
name: realmarketapi-trading-bot-scaffold
description: "Scaffolds a signal or alert bot with a data layer, strategy module, risk checks and notifier. Use when the user asks to build a bot on RealMarketAPI."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: developer-integration
  role: "Coding agent"
---

# Trading Bot Scaffold

Scaffolds a signal or alert bot with a data layer, strategy module, risk checks and notifier. Use when the user asks to build a bot on RealMarketAPI.

## Example requests

- "Build a Telegram bot that alerts on gold RSI."
- "Scaffold a Python signal bot for BTC."

## Data sources

- `GET /api/v1/price`
- `GET /api/v1/candle`
- `GET /api/v1/signals/strategy`
- `wss://api.realmarketapi.com/price`

## Workflow

1. Separate four parts: data client, strategy (pure function from data to signal), risk gate, notifier.
2. Start in signal-only mode: the bot reports, it does not execute.
3. Add state so a signal is sent once per candle, plus a quota budget and a kill switch.
4. If the user adds a broker, keep execution behind an explicit flag with paper trading first.
5. Log every decision with the data it was based on.

## Output

- Project structure with runnable code and configuration through environment variables.
- A dry-run mode and a test for the strategy function.

## Avoid

- Wiring live order execution by default.
- A loop without rate limiting or error handling.

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
