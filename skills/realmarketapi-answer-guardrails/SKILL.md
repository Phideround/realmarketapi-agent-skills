---
name: realmarketapi-answer-guardrails
description: "Applies a final quality and safety pass to any market answer: sourced numbers, stated uncertainty, risk wording and no promises. Use before sending analysis, signals or trade ideas to an end user."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: foundations
  role: "Any agent"
---

# Answer Guardrails

Applies a final quality and safety pass to any market answer: sourced numbers, stated uncertainty, risk wording and no promises. Use before sending analysis, signals or trade ideas to an end user.

## Example requests

- "Review this trade idea before I send it to a client."
- "Make this analysis safe to publish."

## Data sources

No API call of its own. This skill works on data and results gathered by other skills.

## Workflow

1. Check that every number in the draft came from an API response in this session and carries its symbol, timeframe and time.
2. Replace certainty with probability wording. Remove any promise of profit or phrases such as guaranteed or risk-free.
3. Make sure a directional view has an invalidation level and names its main risk.
4. Add a one-line note that the content is informational and not investment advice.
5. Remove secrets, keys and internal identifiers from the output.

## Output

- The checked answer, or a list of the claims that could not be sourced.
- The disclaimer line.

## Avoid

- Padding the answer with long legal text.
- Deleting a real risk to make the answer look cleaner.

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
