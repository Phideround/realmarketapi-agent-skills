---
name: realmarketapi-screener-recipes
description: "Provides ready-made screener filters for common goals such as trend continuation, oversold bounces and quiet ranges. Use when the user wants ideas but has no filter in mind."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: screening-watchlists
  role: "Portfolio assistant"
---

# Screener Recipes

Provides ready-made screener filters for common goals such as trend continuation, oversold bounces and quiet ranges. Use when the user wants ideas but has no filter in mind.

## Example requests

- "Give me some trade ideas."
- "What is setting up for a pullback entry?"

## Data sources

- `POST /api/v1/screener/query`

## Workflow

1. Pick the recipe: strong trend (uptrend, RSI at least 55), oversold in an uptrend (uptrend on the higher timeframe, low RSI on the lower), quiet range (low volatility cap), liquid movers (high liquidity score, sorted by change).
2. Run it on the timeframe that fits the user's horizon.
3. Return at most ten results and name the playbook skill that fits each recipe.

## Output

- Recipe name, filters and results.
- The matching strategy skill.

## Avoid

- Running every recipe at once.
- Presenting screener output as trade signals.

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
