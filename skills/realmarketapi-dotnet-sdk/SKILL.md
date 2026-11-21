---
name: realmarketapi-dotnet-sdk
description: "Uses the official RealMarketAPI.Sdk NuGet package with dependency injection, typed clients and async streams. Use when integrating from C# or any .NET application."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: developer-integration
  role: "Coding agent"
---

# .NET SDK

Uses the official RealMarketAPI.Sdk NuGet package with dependency injection, typed clients and async streams. Use when integrating from C# or any .NET application.

## Example requests

- "Use RealMarketAPI in my ASP.NET app."
- "Stream prices in a .NET worker service."

## Data sources

- `GET /api/v1/price`
- `GET /api/v1/candle`
- `wss://api.realmarketapi.com/price`

## Workflow

1. Install with `dotnet add package RealMarketAPI.Sdk`.
2. Register with `builder.Services.AddRealMarketApiClient(...)`, taking the key from configuration or user secrets.
3. Call typed groups such as `client.Ticker.GetPriceAsync`, `client.Indicators.GetRsiAsync`, `client.Insight.GetConfluenceAsync` and `client.MultiTimeframe.GetAsync`.
4. Stream with `await foreach` over `client.WebSocket.StreamPriceAsync(symbol, timeFrame, ct)` and pass a cancellation token.
5. Check the package README for the current method list.

## Output

- Registration code and a sample service using the client.
- Where the key is configured.

## Avoid

- Creating a new client per request instead of using DI.
- Blocking on async calls.

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
