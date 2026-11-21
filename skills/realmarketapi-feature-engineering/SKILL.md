---
name: realmarketapi-feature-engineering
description: "Builds a model-ready feature table from candles and server-side indicators. Use when the user is preparing data for a machine-learning model."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: quant-research
  role: "Quant researcher"
---

# Feature Engineering

Builds a model-ready feature table from candles and server-side indicators. Use when the user is preparing data for a machine-learning model.

## Example requests

- "Build ML features for BTCUSD H1."
- "Create a training set for a gold direction model."

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_history` | `GET /api/v1/history` |
| `get_rsi` | `GET /api/v1/indicator/rsi` |
| `get_macd` | `GET /api/v1/indicator/macd` |
| `get_atr` | `GET /api/v1/indicator/atr` |
| `get_volatility` | `GET /api/v1/volatility` |

## Workflow

1. Start from clean history, one row per candle.
2. Add returns over several horizons, rolling volatility, range and volume ratios, and time-of-day features.
3. Join server-side indicators on `openTime`, or compute them locally for the full history.
4. Shift every feature so a row uses only information available at its open; define the label from future bars and never include it in features.

## Output

- A feature table with a data dictionary.
- A leakage check describing how each feature is lagged.

## Avoid

- Features that contain the candle's own close when predicting that candle.
- Random train and test splits on time series.

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
