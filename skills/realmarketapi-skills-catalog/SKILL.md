---
name: realmarketapi-skills-catalog
description: "Routes a market question to the right RealMarketAPI skill or sequence of skills. Use first when a request could be served by several skills or when you are unsure which one applies."
license: MIT
metadata:
  author: RealMarketAPI
  version: "1.0.0"
  category: foundations
  role: "Any agent"
---

# Skills Catalog

Routes a market question to the right RealMarketAPI skill or sequence of skills. Use first when a request could be served by several skills or when you are unsure which one applies.

## Example requests

- "Which skill should I use to analyse gold?"
- "I want a full trade plan for EURUSD, where do I start?"

## Data sources

No API call of its own. This skill works on data and results gathered by other skills.

## Workflow

1. Classify the request: data lookup, technical read, risk question, strategy or trade plan, monitoring, report, quant research, or integration work.
2. Pick the agent role that owns it from the index below, then the narrowest skill that answers it.
3. For a directional question, chain skills in this order: market context, analysis (technical, structure or insight), risk, then decision.
4. Load at most three skills for one request. Prefer one specialist skill over several general ones.
5. If the symbol has a specialist skill (gold, bitcoin, oil, indices, and so on), add it after the general analysis skill.

## Output

- The chosen skill names, in order, with one line on why each is needed.
- Any missing input the user must supply (symbol, timeframe, account size).

## Avoid

- Loading every skill in a category for a narrow question.
- Skipping market context before a trade decision.

## Skill index

### Foundations

Setup, routing, plan awareness and data hygiene that every other skill builds on.

- `realmarketapi-skills-catalog`: Routes a market question to the right RealMarketAPI skill or sequence of skills.
- `realmarketapi-quickstart`: Connects an agent to RealMarketAPI over MCP or REST and verifies the connection with a first live call.
- `realmarketapi-plan-and-quota-check`: Reads the plan, allowed symbols, timeframes, history range and request usage for an API key and adapts the workflow to them.
- `realmarketapi-symbol-resolver`: Maps everyday instrument names such as gold, bitcoin, cable or the S&P 500 to exact RealMarketAPI symbol codes.
- `realmarketapi-timeframe-selector`: Chooses the analysis, execution and trigger timeframes that fit a trading horizon and the timeframes a plan allows.
- `realmarketapi-error-recovery`: Diagnoses failed RealMarketAPI calls from the problem+json body and chooses the right recovery.
- `realmarketapi-request-budgeting`: Plans the smallest set of calls that answers a question and avoids waste on a metered plan.
- `realmarketapi-data-freshness-check`: Verifies that returned prices are current by comparing candle timestamps with the clock and the market schedule.
- `realmarketapi-answer-guardrails`: Applies a final quality and safety pass to any market answer: sourced numbers, stated uncertainty, risk wording and no promises.

### Market Data Analyst

Live quotes, snapshots, candles, history and descriptive statistics.

- `realmarketapi-market-context`: Builds a quick picture of where a symbol stands right now: last price, 24h baseline, recent candles and position in the day's range.
- `realmarketapi-live-price-quote`: Returns the latest price, bid, ask and spread for one symbol.
- `realmarketapi-cross-rates`: Prices a pair that is not listed directly, such as gold in Vietnamese dong, EURJPY or BTC in ETH, by deriving it from listed pairs, and shows the legs used.
- `realmarketapi-market-snapshot`: Summarises every symbol on the plan in one call with hourly and daily change.
- `realmarketapi-category-snapshot`: Summarises one asset class such as forex, crypto, stocks, indices or commodities.
- `realmarketapi-daily-stats-24h`: Reports 24-hour open, high, low, volume and percentage change per symbol.
- `realmarketapi-top-movers`: Ranks the biggest gainers and losers over the last 24 hours.
- `realmarketapi-candle-reader`: Reads recent OHLCV candles and describes price action in plain language.
- `realmarketapi-historical-data-pull`: Downloads paged historical candles for a date range and returns a clean, ordered dataset.
- `realmarketapi-spread-monitor`: Measures the bid-ask spread of a symbol and tells whether it is normal or wide.
- `realmarketapi-volume-analysis`: Compares current volume with its recent average and relates it to price movement.
- `realmarketapi-price-change-calculator`: Calculates the absolute and percentage change of a symbol between two points in time.
- `realmarketapi-cross-asset-comparison`: Compares the performance of several symbols over the same window on a normalised basis.
- `realmarketapi-range-statistics`: Computes average daily range, typical session range and how much of today's range is already used.
- `realmarketapi-gap-detector`: Finds price gaps between one candle's close and the next open, including weekend gaps.

### Technical Analyst

Indicator reads, levels, patterns and multi-timeframe alignment.

- `realmarketapi-technical-analysis`: Produces a complete technical read of one symbol from trend, momentum, levels and sentiment.
- `realmarketapi-trend-identification`: Determines direction and strength of the trend on one timeframe.
- `realmarketapi-moving-average-analysis`: Reads SMA, EMA and WMA values, their slopes, stacking and crossovers.
- `realmarketapi-rsi-analysis`: Interprets the Relative Strength Index for momentum, overbought and oversold conditions and regime.
- `realmarketapi-macd-analysis`: Interprets MACD line, signal line and histogram for momentum shifts.
- `realmarketapi-bollinger-bands-analysis`: Reads Bollinger Bands for volatility state, squeezes and band position.
- `realmarketapi-stochastic-analysis`: Interprets the Stochastic oscillator %K and %D for short-term turning points.
- `realmarketapi-adx-trend-strength`: Measures trend strength and directional dominance with ADX, +DI and -DI.
- `realmarketapi-cci-analysis`: Interprets the Commodity Channel Index for momentum bursts and extremes.
- `realmarketapi-williams-r-analysis`: Interprets Williams %R for overbought and oversold timing.
- `realmarketapi-atr-analysis`: Reads Average True Range to size expected movement on a timeframe.
- `realmarketapi-fibonacci-levels`: Retrieves Fibonacci retracement and extension levels for the current swing.
- `realmarketapi-support-resistance-mapping`: Maps the nearest support and resistance levels around current price and ranks them.
- `realmarketapi-momentum-oscillator-consensus`: Polls RSI, Stochastic, CCI and Williams %R and reports whether they agree.
- `realmarketapi-divergence-detector`: Finds regular and hidden divergence between price swings and RSI or MACD.
- `realmarketapi-candlestick-patterns`: Detects common candlestick patterns in recent closed candles and rates them by location.
- `realmarketapi-chart-pattern-scout`: Looks for classical chart structures such as double tops and bottoms, triangles, flags and head and shoulders in candle data.
- `realmarketapi-multi-timeframe`: Checks trend alignment from the highest to the lowest timeframe in one pass.
- `realmarketapi-indicator-confluence`: Scores how many independent technical factors agree on direction.
- `realmarketapi-pivot-points`: Calculates classic daily pivot levels from the previous day's candle.
- `realmarketapi-golden-death-cross`: Checks the 50 and 200 period SMA relationship on the daily chart.

### Risk and Volatility Manager

Volatility regimes, position sizing, stops, targets and portfolio risk.

- `realmarketapi-volatility-regime`: Classifies current volatility as low, normal or high from ATR percent and Bollinger width.
- `realmarketapi-volatility-spike-alert`: Finds candles where ATR spiked above a multiple of its norm.
- `realmarketapi-volatility-heatmap-timing`: Uses the day-of-week by hour-of-day volatility heatmap to find the most and least active trading windows.
- `realmarketapi-position-sizing`: Calculates position size from account balance, risk percentage and stop distance.
- `realmarketapi-stop-loss-placement`: Proposes a stop-loss level from structure, volatility and known stop-hunt zones.
- `realmarketapi-take-profit-targets`: Sets profit targets from opposing structure, Fibonacci extensions and liquidity zones.
- `realmarketapi-risk-reward-evaluator`: Computes reward-to-risk for a proposed entry, stop and target and the win rate needed to break even.
- `realmarketapi-trade-risk-check`: Runs a pre-trade checklist across manipulation risk, anomalies, volatility and scheduled events.
- `realmarketapi-drawdown-analysis`: Measures maximum drawdown, current drawdown and recovery time of a symbol or an equity series.
- `realmarketapi-correlation-matrix`: Computes return correlations between symbols over a chosen window.
- `realmarketapi-portfolio-exposure`: Aggregates open positions into net exposure by currency, asset class and direction.
- `realmarketapi-value-at-risk`: Estimates historical one-day value at risk and expected shortfall for a position or small portfolio.
- `realmarketapi-margin-and-leverage`: Calculates required margin, effective leverage and distance to a margin call for a position.
- `realmarketapi-trailing-stop-manager`: Proposes trailing-stop updates for an open position using ATR and structure.

### Market Structure Analyst

Liquidity, stop hunts, order flow, anomalies and smart-money concepts.

- `realmarketapi-liquidity-zones`: Maps clusters of resting liquidity above and below price.
- `realmarketapi-stop-hunt-zones`: Identifies areas beyond key levels where stop orders are likely clustered and exposed to a sweep.
- `realmarketapi-orderflow-imbalance`: Reads bullish versus bearish candle dominance and imbalance zones.
- `realmarketapi-anomaly-detection`: Flags sudden price spikes and unusual volume in recent candles.
- `realmarketapi-manipulation-risk`: Reports the current manipulation risk level for a symbol and what drives it.
- `realmarketapi-market-structure-bos`: Labels swing structure, breaks of structure and changes of character from candle data.
- `realmarketapi-fair-value-gaps`: Finds three-candle price imbalances that have not been filled.
- `realmarketapi-order-blocks`: Locates the last opposing candle before a strong displacement move as a potential reaction zone.
- `realmarketapi-liquidity-sweep-setup`: Detects a sweep of a stop-hunt zone followed by a reclaim of the level.
- `realmarketapi-smart-money-narrative`: Combines structure, liquidity, imbalances and order flow into one coherent story of what price is doing and where it is drawn next.

### Signal and Insight Analyst

Composite scores, setups, next-candle bias, sentiment and final decisions.

- `realmarketapi-insight-score`: Reads the composite bullish or bearish score from 0 to 100 for a symbol.
- `realmarketapi-insight-trend`: Returns the classified trend direction from StrongUptrend to StrongDowntrend.
- `realmarketapi-insight-setup`: Identifies the current setup type as Breakout, Pullback or Range.
- `realmarketapi-insight-next-candle`: Reads the next-candle directional bias with its supporting indicators and levels.
- `realmarketapi-insight-confluence`: Returns the combined Buy, Sell or Neutral signal from all insight components.
- `realmarketapi-strategy-signal`: Retrieves the Signal Lab strategy signal with confidence, risk level, invalidation price and reasons.
- `realmarketapi-sentiment-analysis`: Reads trend direction, market sentiment and the Fear and Greed score for a symbol.
- `realmarketapi-signal-validation`: Cross-checks a trade signal from any source against independent data and risk conditions.
- `realmarketapi-trading-decision`: Turns context, analysis and risk into a final bias with entry zone, invalidation, targets and confidence.

### Trader

Style playbooks, rule-based strategies, trade plans, management and journaling.

- `realmarketapi-scalping-playbook`: Runs a scalping routine on M1 and M5 with M15 context, tight risk and session filters.
- `realmarketapi-day-trading-playbook`: Runs an intraday routine with H4 bias, H1 structure and M15 entries, flat by the end of the session.
- `realmarketapi-swing-trading-playbook`: Runs a multi-day routine with D1 trend, H4 setups and H1 timing.
- `realmarketapi-position-trading-playbook`: Runs a long-horizon routine on the daily chart using the 50 and 200 period averages.
- `realmarketapi-breakout-strategy`: Trades a confirmed break of a well-tested level with volatility expansion.
- `realmarketapi-pullback-strategy`: Enters an established trend on a retracement to value.
- `realmarketapi-range-trading-strategy`: Fades the edges of a defined range while trend strength is low.
- `realmarketapi-mean-reversion-strategy`: Trades a return to the mean after a statistical stretch from Bollinger Bands and RSI.
- `realmarketapi-trend-following-strategy`: Rides established trends with moving-average alignment and an ATR trailing stop.
- `realmarketapi-momentum-strategy`: Buys strength and sells weakness when momentum, trend strength and order flow agree.
- `realmarketapi-ema-crossover-strategy`: Trades the cross of a fast and slow EMA with a trend-strength filter.
- `realmarketapi-rsi-reversal-strategy`: Trades reversals from RSI extremes that are backed by divergence and a level.
- `realmarketapi-bollinger-squeeze-strategy`: Trades the volatility expansion that follows a Bollinger Band squeeze.
- `realmarketapi-news-event-strategy`: Plans around a scheduled high-impact event: stand aside, trade the reaction, or trade the retrace.
- `realmarketapi-trade-plan-builder`: Writes a complete trade plan with thesis, entry, stop, targets, size and management rules.
- `realmarketapi-trade-management`: Reviews an open position against live data and recommends hold, reduce, trail or exit.
- `realmarketapi-trade-journal`: Records trades with market conditions at entry and reviews them for patterns.

### Asset Specialists

Instrument-specific behaviour for metals, forex, crypto, energy, indices and stocks.

- `realmarketapi-xauusd-specialist`: Analyses gold with its own habits in mind: session behaviour, round numbers, dollar linkage and liquidity sweeps.
- `realmarketapi-silver-specialist`: Analyses silver and its relationship to gold through the gold-silver ratio.
- `realmarketapi-forex-majors-specialist`: Analyses EURUSD, GBPUSD, USDJPY, AUDUSD, USDCAD and NZDUSD with the dollar as the common driver.
- `realmarketapi-jpy-pairs-specialist`: Analyses USDJPY and GBPJPY with attention to their volatility, risk sensitivity and sharp reversals.
- `realmarketapi-dxy-dollar-analyst`: Analyses the US dollar index and what it implies for forex, gold and risk assets.
- `realmarketapi-bitcoin-specialist`: Analyses BTCUSD as a 24/7 market with weekend behaviour, round-number levels and high volatility.
- `realmarketapi-altcoin-specialist`: Analyses ETH, SOL, XRP, BNB, ADA, LINK, DOGE and CAKE relative to bitcoin.
- `realmarketapi-crypto-market-breadth`: Measures how broad a crypto move is across all covered coins.
- `realmarketapi-oil-specialist`: Analyses WTI and Brent crude and the spread between them.
- `realmarketapi-commodities-specialist`: Analyses natural gas, platinum and copper.
- `realmarketapi-us-indices-specialist`: Analyses US500, US30 and USTEC together, including leadership between them.
- `realmarketapi-global-indices-specialist`: Analyses European and Asia-Pacific indices: UK100, DE30, FR40, STOXX50, JP225, HK50, AUS200 and IN50.
- `realmarketapi-us-stocks-specialist`: Analyses covered US stocks such as AAPL, MSFT, NVDA, TSLA, AMZN, GOOGL and META on price data.
- `realmarketapi-intermarket-analysis`: Reads the relationships between the dollar, gold, oil, equity indices and bitcoin to judge the macro tone.

### Session and Macro Analyst

Trading sessions, the economic calendar, event risk and market regime.

- `realmarketapi-market-sessions`: Reports which trading sessions are open, overlapping or about to open.
- `realmarketapi-economic-calendar-briefing`: Lists the day's high-impact economic events and the symbols they affect.
- `realmarketapi-event-risk-filter`: Decides whether a planned trade falls inside a no-trade window around a scheduled event.
- `realmarketapi-session-open-playbook`: Trades the break of the prior session's range at the London or New York open.
- `realmarketapi-risk-sentiment-gauge`: Scores market-wide risk appetite from indices, the dollar, gold, bitcoin and yen pairs.
- `realmarketapi-market-regime-classifier`: Classifies a symbol as trending, ranging, volatile or quiet and names the tactics that fit.

### Quant Researcher

Data preparation, backtests, performance metrics and statistical studies.

- `realmarketapi-backtest-data-prep`: Builds a clean, gap-checked candle dataset ready for backtesting.
- `realmarketapi-backtest-strategy-runner`: Runs a rule-based strategy over historical candles and reports the result with costs.
- `realmarketapi-performance-metrics`: Computes standard performance statistics from a list of trades or an equity curve.
- `realmarketapi-seasonality-analysis`: Measures average return and volatility by hour of day, day of week or month.
- `realmarketapi-returns-distribution`: Describes the distribution of a symbol's returns, including tails and skew.
- `realmarketapi-pairs-trading-scan`: Tests whether two related symbols have a stable spread and how stretched it is now.
- `realmarketapi-relative-strength-ranking`: Ranks a set of symbols by performance over several lookback windows.
- `realmarketapi-currency-strength-meter`: Scores individual currencies by averaging their moves across all covered pairs.
- `realmarketapi-feature-engineering`: Builds a model-ready feature table from candles and server-side indicators.
- `realmarketapi-walk-forward-validation`: Tests a strategy across rolling train and test windows to check that results survive out of sample.

### Screening and Watchlist Manager

Market screener queries, watchlists, opportunity ranking and portfolio reviews.

- `realmarketapi-market-screener`: Queries the Market Screener for symbols matching trend, RSI, volatility and liquidity filters.
- `realmarketapi-screener-recipes`: Provides ready-made screener filters for common goals such as trend continuation, oversold bounces and quiet ranges.
- `realmarketapi-opportunity-ranking`: Ranks a shortlist of symbols by setup quality using insight score, confluence and risk.
- `realmarketapi-watchlist-builder`: Creates a watchlist and adds symbols to it through the Watchlist Hub.
- `realmarketapi-watchlist-review`: Scans every symbol on a watchlist and flags the ones that need attention.
- `realmarketapi-portfolio-health-check`: Reviews a set of holdings for performance, concentration, correlation and trend health.

### Alerts and Monitoring Operator

Alert rules, live streams, watchdog loops and incident triage.

- `realmarketapi-alert-creator`: Creates an alert rule in the Alert Center for a symbol, condition and delivery channel.
- `realmarketapi-alert-manager`: Lists, reviews and deletes alert rules.
- `realmarketapi-price-level-watch`: Derives the levels worth watching on a symbol and turns them into alert proposals.
- `realmarketapi-websocket-price-monitor`: Watches live prices over the WebSocket stream instead of polling.
- `realmarketapi-market-watchdog`: Runs a periodic check for anomalies, volatility spikes and risk changes across a set of symbols.
- `realmarketapi-incident-triage`: Investigates a sudden move and reports what happened, how unusual it is and what state the market is in now.
- `realmarketapi-telegram-bot-usage`: Explains how to use the RealMarketAPI Telegram bot for price queries and alerts without code.

### Reporting and Content Writer

Briefings, recaps, reports and plain-language explanations built on live data.

- `realmarketapi-daily-market-brief`: Writes a short daily briefing across asset classes with movers, levels and the day's events.
- `realmarketapi-weekly-market-recap`: Summarises the week's performance, ranges and notable moves and looks ahead to next week's events.
- `realmarketapi-session-briefing`: Prepares a pre-session note with overnight moves, levels and events for the session about to open.
- `realmarketapi-technical-report-writer`: Writes a structured single-symbol technical report suitable for clients or publication.
- `realmarketapi-social-post-writer`: Writes short market updates for social platforms from live data.
- `realmarketapi-newsletter-writer`: Writes a market newsletter issue with a lead story, a data section and a look ahead.
- `realmarketapi-plain-language-explainer`: Explains what a market reading means in simple terms for a beginner, using the live value as the example.
- `realmarketapi-chart-data-export`: Prepares candle and indicator data in the shape a charting library or spreadsheet expects.

### Developer and Integration Engineer

REST, WebSocket, MCP and SDK integration, plus app and bot scaffolds.

- `realmarketapi-rest-integration`: Integrates the RealMarketAPI REST API into an application with correct auth, conventions and error handling.
- `realmarketapi-websocket-integration`: Implements a resilient WebSocket client for the price, candles, market, multi-timeframe and order-flow streams.
- `realmarketapi-mcp-client-setup`: Connects an MCP-compatible client such as Claude Desktop, Claude Code or Cursor to the RealMarketAPI MCP server.
- `realmarketapi-dotnet-sdk`: Uses the official RealMarketAPI.Sdk NuGet package with dependency injection, typed clients and async streams.
- `realmarketapi-javascript-sdk`: Uses the realmarketapi-js-sdk-beta npm package from Node.js.
- `realmarketapi-python-sdk`: Uses the realmarketapi-python-sdk-beta PyPI package for REST and WebSocket access.
- `realmarketapi-trading-bot-scaffold`: Scaffolds a signal or alert bot with a data layer, strategy module, risk checks and notifier.
- `realmarketapi-dashboard-builder`: Builds a market dashboard with a server-side proxy, live prices and charts.
- `realmarketapi-data-pipeline`: Designs an ingestion job that stores candles in a database and keeps them current.

### Multi-Agent Trading Team

Role prompts for a research and trading desk: orchestrator, researchers, risk, compliance and portfolio manager.

- `realmarketapi-team-orchestrator`: Coordinates a team of specialist agents through research, debate, risk review and decision.
- `realmarketapi-bull-researcher`: Builds the strongest evidence-based case for a long position.
- `realmarketapi-bear-researcher`: Builds the strongest evidence-based case for a short position or for staying out.
- `realmarketapi-risk-officer`: Reviews a proposed trade against risk limits and has the authority to reduce or reject it.
- `realmarketapi-portfolio-manager`: Makes the final call after hearing the research, the debate and the risk review.
- `realmarketapi-execution-planner`: Turns an approved decision into a precise order ticket for a human or a broker integration to place.
- `realmarketapi-compliance-reviewer`: Reviews market content before it reaches an audience for unsupported claims, promises and missing risk disclosure.

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
