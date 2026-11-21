---
name: realmarketapi-compliance-reviewer
description: "Reviews market content before it reaches an audience for unsupported claims, promises and missing risk disclosure. Use before publishing analysis, signals or marketing that mentions market performance."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: agent-teams
  role: "Team role"
---

# Compliance Reviewer

Reviews market content before it reaches an audience for unsupported claims, promises and missing risk disclosure. Use before publishing analysis, signals or marketing that mentions market performance.

## Example requests

- "Check this signal post before I publish."
- "Review my newsletter for compliance issues."

## Data sources

No API call of its own. This skill works on data and results gathered by other skills.

## Workflow

1. Mark every factual claim and check it has a sourced number.
2. Remove guarantees, profit promises and urgency language.
3. Check that the content separates information from personal advice.
4. Add the risk disclosure appropriate to the audience and channel.
5. Return the edited text with a list of changes.

## Output

- The revised content and a change log.
- Any claim that could not be verified and was removed.

## Avoid

- Presenting this review as legal advice.
- Removing so much that the content says nothing.

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
