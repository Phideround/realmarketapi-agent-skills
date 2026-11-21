---
name: realmarketapi-mcp-client-setup
description: "Connects an MCP-compatible client such as Claude Desktop, Claude Code or Cursor to the RealMarketAPI MCP server. Use when the user wants their AI assistant to call market tools directly."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: developer-integration
  role: "Coding agent"
---

# MCP Client Setup

Connects an MCP-compatible client such as Claude Desktop, Claude Code or Cursor to the RealMarketAPI MCP server. Use when the user wants their AI assistant to call market tools directly.

## Example requests

- "Connect Claude Desktop to RealMarketAPI."
- "Set up the MCP server in Cursor."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_symbols` | `GET /api/v1/symbol` |
| `get_price` | `GET /api/v1/price` |

## Workflow

1. Confirm the plan is Pro or above; MCP is not available below it.
2. Add a server named `realmarketapi` with the URL `https://ai.realmarketapi.com/mcp?apiKey=YOUR_API_KEY` using Streamable HTTP.
3. Restart the client, list tools and expect 33 of them.
4. Verify with `get_symbols` and one `get_price` call.

## Output

- The config snippet for the user's client with a placeholder key.
- Verification result.

## Avoid

- Writing a real key into a config file that is committed or shared.
- Debugging tools before checking the plan.

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
