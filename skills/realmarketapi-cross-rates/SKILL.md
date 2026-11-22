---
name: realmarketapi-cross-rates
description: "Prices a pair that is not listed directly, such as gold in Vietnamese dong, EURJPY or BTC in ETH, by deriving it from listed pairs, and shows the legs used. Use when the user wants a price in a local or non-USD currency, asks for a cross pair, or asks which crosses are available."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: market-data
  role: "Market data analyst"
---

# Cross Rates

Prices a pair that is not listed directly, such as gold in Vietnamese dong, EURJPY or BTC in ETH, by deriving it from listed pairs, and shows the legs used. Use when the user wants a price in a local or non-USD currency, asks for a cross pair, or asks which crosses are available.

## Example requests

- "What is gold in Vietnamese dong right now?"
- "Price EURJPY and show me how it was derived."
- "Which crosses can I get against THB?"

## Data sources

| MCP tool | REST equivalent |
|---|---|
| `get_cross_price` | `GET /api/v1/price/cross` |
| `list_cross_symbols` | `GET /api/v1/symbol/cross` |
| `get_symbols` | `GET /api/v1/symbol` |

## Workflow

1. Check `get_symbols` first: if the pair is listed directly, quote it with `get_price` instead.
2. Build the code as BASE+QUOTE currency codes (gold in dong is XAUVND, yen per euro is EURJPY). If unsure it can be derived, call `list_cross_symbols` with `baseCurrency` or `quoteCurrency` to filter; it needs no API key and lists only derivable pairs, not listed ones.
3. Call `get_cross_price` with `symbolCode` and `timeFrame` (M1 for a live quote). It is one request against quota however many legs it uses.
4. Read `bid`, `ask`, `closePrice` and `openTime`, then list each leg from `legs[]` with its `symbolCode`, whether it was `inverted`, and its own `openTime`. For example XAUVND = XAUUSD x USDVND, VNDUSD = 1 / USDVND, BTCETH = BTCUSD / ETHUSD.
5. Explain the quote: bid multiplies the legs' bids and ask multiplies their asks, with an inverted leg's bid and ask swapped, so the spread is the legs' spreads combined. `openTime` is the oldest leg's candle, so the cross is only as fresh as its stalest leg; flag it when one leg's market is closed.
6. On `ERR_0008_SYMBOL_NOT_SUPPORTED` the pair cannot be derived or a leg is not on the plan; on `ERR_0007` the timeframe is not on the plan; on `ERR_0001` a leg has no price yet. Say which and suggest the nearest available cross.

## Output

- Cross price, bid, ask, spread and `openTime` in UTC, with the unit (for example VND per troy ounce).
- The legs used, each with its own price, inversion flag and time.

## Avoid

- Multiplying two `get_price` calls yourself when `get_cross_price` does it in one request with the correct bid and ask.
- Asking for high, low or volume on a cross; only bid, ask, open and close are returned.
- Treating stocks, indices or oil as currencies; only forex, metal and crypto symbols can be legs.

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
