# RealMarketAPI Agent Skills

<!-- count -->161<!-- /count --> ready-to-use [Agent Skills](https://agentskills.io) that teach AI agents how to work with [RealMarketAPI](https://realmarketapi.com): real-time and historical market data for forex, metals, crypto, commodities, indices and stocks, with server-side indicators, volatility analytics and market-structure signals.

Each skill is a folder with a `SKILL.md` file: a short description that tells the agent when to use it, the exact MCP tools and REST routes to call, a step-by-step workflow, the output to produce and the mistakes to avoid. They work in Claude Code, Claude Desktop, Cursor, Codex, Gemini CLI, GitHub Copilot and any other agent that reads the `SKILL.md` format.

## Skills by agent role

<!-- table:start -->
| Category | Agent role | Skills | Covers |
|---|---|---|---|
| [Foundations](CATALOG.md#foundations) | Any agent | 9 | Setup, routing, plan awareness and data hygiene that every other skill builds on. |
| [Market Data Analyst](CATALOG.md#market-data) | Market data analyst | 14 | Live quotes, snapshots, candles, history and descriptive statistics. |
| [Technical Analyst](CATALOG.md#technical-analysis) | Technical analyst | 21 | Indicator reads, levels, patterns and multi-timeframe alignment. |
| [Risk and Volatility Manager](CATALOG.md#risk-volatility) | Risk manager | 14 | Volatility regimes, position sizing, stops, targets and portfolio risk. |
| [Market Structure Analyst](CATALOG.md#market-structure) | Market structure analyst | 10 | Liquidity, stop hunts, order flow, anomalies and smart-money concepts. |
| [Signal and Insight Analyst](CATALOG.md#signals-insight) | Signal analyst | 9 | Composite scores, setups, next-candle bias, sentiment and final decisions. |
| [Trader](CATALOG.md#trading-strategies) | Trader | 17 | Style playbooks, rule-based strategies, trade plans, management and journaling. |
| [Asset Specialists](CATALOG.md#asset-specialists) | Asset-class specialist | 14 | Instrument-specific behaviour for metals, forex, crypto, energy, indices and stocks. |
| [Session and Macro Analyst](CATALOG.md#sessions-macro) | Macro analyst | 6 | Trading sessions, the economic calendar, event risk and market regime. |
| [Quant Researcher](CATALOG.md#quant-research) | Quant researcher | 10 | Data preparation, backtests, performance metrics and statistical studies. |
| [Screening and Watchlist Manager](CATALOG.md#screening-watchlists) | Portfolio assistant | 6 | Market screener queries, watchlists, opportunity ranking and portfolio reviews. |
| [Alerts and Monitoring Operator](CATALOG.md#alerts-monitoring) | Monitoring agent | 7 | Alert rules, live streams, watchdog loops and incident triage. |
| [Reporting and Content Writer](CATALOG.md#reporting-content) | Market reporter | 8 | Briefings, recaps, reports and plain-language explanations built on live data. |
| [Developer and Integration Engineer](CATALOG.md#developer-integration) | Coding agent | 9 | REST, WebSocket, MCP and SDK integration, plus app and bot scaffolds. |
| [Multi-Agent Trading Team](CATALOG.md#agent-teams) | Team role | 7 | Role prompts for a research and trading desk: orchestrator, researchers, risk, compliance and portfolio manager. |
<!-- table:end -->

Full list with descriptions: [CATALOG.md](CATALOG.md). Machine-readable index: [skills.json](skills.json).

## Install

### With the skills CLI

```bash
# choose skills interactively
npx skills add Phideround/realmarketapi-agent-skills

# install one skill
npx skills add Phideround/realmarketapi-agent-skills --skill realmarketapi-technical-analysis
```

### Manually

Copy the skill folders you want into your agent's skills directory.

```bash
git clone https://github.com/Phideround/realmarketapi-agent-skills.git

# Claude Code, for one project
cp -r realmarketapi-agent-skills/skills/realmarketapi-market-context .claude/skills/

# Claude Code, for every project
cp -r realmarketapi-agent-skills/skills/* ~/.claude/skills/
```

Other agents use the same folders under their own path, for example `.agents/skills/` or `.cursor/skills/`. Check your agent's documentation.

Start with `realmarketapi-skills-catalog`. It is a routing skill that tells the agent which of the others to load for a request, so you can install many skills without the agent loading all of them.

## Connect the data

Skills describe the workflow. The data comes from RealMarketAPI, over either transport:

| Transport | Endpoint | Plan |
|---|---|---|
| MCP server (33 tools) | `https://ai.realmarketapi.com/mcp?apiKey=YOUR_API_KEY` | Pro and above |
| REST | `https://api.realmarketapi.com/api/v1/<route>?apiKey=YOUR_API_KEY` | All plans, routes gated by plan |
| WebSocket | `wss://api.realmarketapi.com/<stream>?apiKey=YOUR_API_KEY` | Plus and above |

MCP client configuration:

```json
{
  "mcpServers": {
    "realmarketapi": { "url": "https://ai.realmarketapi.com/mcp?apiKey=YOUR_API_KEY" }
  }
}
```

Every skill lists the MCP tool and its REST equivalent, so an agent without MCP can call the REST route instead. Get a key at <https://realmarketapi.com/en-US/register>. Keep it in an environment variable or your client's secret store, never in a committed file.

## Example

With `realmarketapi-market-context`, `realmarketapi-technical-analysis` and `realmarketapi-trading-decision` installed:

> Analyse XAUUSD on H1 and tell me whether there is a trade.

The agent establishes context (price, 24h baseline, position in range), reads trend, momentum and levels, checks risk, and returns a bias with an entry zone, an invalidation level, targets and a confidence rating, each number tied to the candle it came from.

## What these skills do not do

- They do not place orders. RealMarketAPI is a market data and analytics API, not a broker.
- They do not provide news, fundamentals, order-book depth or on-chain data.
- They do not give investment advice. Output is informational; every directional view carries an invalidation level and its main risk.

## Repository layout

```
catalog/      Source data for every skill, one file per group of roles
scripts/      build.mjs generates everything below from catalog/
skills/       Generated: one folder per skill with its SKILL.md
CATALOG.md    Generated: every skill grouped by role
skills.json   Generated: machine-readable index
```

## Contributing

Edit or add a skill in `catalog/`, then run:

```bash
npm run build
```

The build validates names, descriptions and tool references, and regenerates `skills/`, `CATALOG.md`, `skills.json` and the table above. Do not edit generated files by hand. A skill's description must say what it does and when to use it, and it may only reference tools and routes that exist in the [API reference](https://realmarketapi.com/en-US/docs).

## Links

- Documentation: <https://realmarketapi.com/en-US/docs>
- Skills page: <https://realmarketapi.com/en-US/docs/skills>
- MCP server: <https://realmarketapi.com/en-US/docs/mcp>
- OpenAPI spec: <https://realmarketapi.com/.well-known/openapi.json>
- SDKs: [.NET](https://github.com/Phideround/RealMarketAPI.Sdk), [JavaScript](https://github.com/Phideround/RealMarketAPI.JavaScript.Sdk), [Python](https://github.com/Phideround/RealMarketAPI.Python.Sdk)

## License

[MIT](LICENSE)
