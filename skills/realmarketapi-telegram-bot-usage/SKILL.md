---
name: realmarketapi-telegram-bot-usage
description: "Explains how to use the RealMarketAPI Telegram bot for price queries and alerts without code. Use when the user wants prices or alerts on their phone or asks about the bot."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: alerts-monitoring
  role: "Monitoring agent"
---

# Telegram Bot Usage

Explains how to use the RealMarketAPI Telegram bot for price queries and alerts without code. Use when the user wants prices or alerts on their phone or asks about the bot.

## Example requests

- "How do I get gold prices on Telegram?"
- "Can alerts go to my phone?"

## Data sources

- `GET /api/v1/alerts`

## Workflow

1. Point the user to the Telegram docs at realmarketapi.com/en-US/docs/telegram for linking their account.
2. Show the basic command pattern, for example `/price XAUUSD`.
3. Explain that alerts created through the API can deliver to Telegram when that channel is selected.

## Output

- Short setup steps and example commands.
- How alerts reach Telegram.

## Avoid

- Inventing commands that are not in the docs.
- Asking the user to paste a bot token or API key into chat.

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
