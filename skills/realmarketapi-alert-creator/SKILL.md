---
name: realmarketapi-alert-creator
description: "Creates an alert rule in the Alert Center for a symbol, condition and delivery channel. Use when the user asks to be notified when something happens."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: alerts-monitoring
  role: "Monitoring agent"
---

# Alert Creator

Creates an alert rule in the Alert Center for a symbol, condition and delivery channel. Use when the user asks to be notified when something happens.

## Example requests

- "Alert me when gold goes above 2,700."
- "Notify me on Telegram if BTC RSI drops under 30."

## Data sources

- `GET /api/v1/alerts`
- `POST /api/v1/alerts`

## Workflow

1. Turn the request into `symbolCode`, `timeFrame`, `ruleType`, `threshold`, `cooldownSeconds` and `channels`; read allowed `ruleType` and channel values from the OpenAPI spec.
2. List existing alerts to avoid a duplicate.
3. Confirm the rule in plain words with the user, then `POST /api/v1/alerts` with a fresh `idempotencyKey`.
4. Report the created alert and how it will be delivered.

## Output

- The alert id and a plain-language description of the rule.
- Cooldown and channel.

## Avoid

- Creating alerts without confirmation.
- A cooldown so short that one move sends dozens of notifications.

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
