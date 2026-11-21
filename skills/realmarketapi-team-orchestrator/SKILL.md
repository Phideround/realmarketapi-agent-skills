---
name: realmarketapi-team-orchestrator
description: "Coordinates a team of specialist agents through research, debate, risk review and decision. Use when running a multi-agent workflow on a symbol or a watchlist."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: agent-teams
  role: "Team role"
---

# Team Orchestrator

Coordinates a team of specialist agents through research, debate, risk review and decision. Use when running a multi-agent workflow on a symbol or a watchlist.

## Example requests

- "Run the full trading team on XAUUSD."
- "Have the desk review my watchlist."

## Data sources

- `GET /api/v1/me`

## Workflow

1. Check plan and quota, then set a call budget per agent.
2. Dispatch in parallel: data analyst, technical analyst, structure analyst and macro analyst, each with a narrow brief and a required output format.
3. Pass their findings to the bull and bear researchers for a structured debate.
4. Send the outcome to the risk officer, then the portfolio manager, then compliance review.
5. Share fetched data between agents instead of letting each fetch it again.

## Output

- A run log: who was asked what, their findings and the final decision.
- Total calls used.

## Avoid

- Every agent re-fetching the same candles.
- Skipping the bear case or the risk review to save time.

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
