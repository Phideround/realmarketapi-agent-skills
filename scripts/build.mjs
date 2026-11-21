// Builds skills/<name>/SKILL.md, CATALOG.md, skills.json and the README table
// from the source data in catalog/. Run: node scripts/build.mjs
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { categories } from "../catalog/index.mjs"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const REPO = "https://github.com/Phideround/realmarketapi-agent-skills"
const VERSION = "1.0.0"

/** MCP tool -> REST route (relative to /api/v1). */
const MCP = {
  get_symbols: "/symbol",
  get_timeframes: "/me (timeframes on your plan)",
  get_price: "/price",
  get_candles: "/candle",
  get_history: "/history",
  get_baseline_candles: "/market/baseline-candles-hourly",
  get_sma: "/indicator/sma",
  get_ema: "/indicator/ema",
  get_rsi: "/indicator/rsi",
  get_macd: "/indicator/macd",
  get_bollinger_bands: "/indicator/bollinger-bands",
  get_stochastic: "/indicator/stochastic",
  get_atr: "/indicator/atr",
  get_cci: "/indicator/cci",
  get_williams_r: "/indicator/williams-r",
  get_adx: "/indicator/adx",
  get_fibonacci: "/indicator/fibonacci",
  get_support_resistance: "/indicator/support-resistance",
  get_sentiment: "/indicator/sentiment",
  get_volatility: "/volatility",
  get_volatility_spikes: "/volatility/spikes",
  get_volatility_heatmap: "/volatility/heatmap",
  get_insight_score: "/insight/score",
  get_insight_trend: "/insight/trend",
  get_insight_setup: "/insight/setup",
  get_insight_next: "/insight/next",
  get_insight_confluence: "/insight/confluence",
  get_multi_timeframe: "/multi-timeframe",
  get_orderflow_imbalance: "/orderflow/imbalance",
  get_liquidity_zones: "/liquidity/zones",
  get_stop_hunt_zones: "/stop-hunt/zones",
  get_anomaly: "/anomaly",
  get_manipulation_risk: "/manipulation-risk",
}

const ACCESS = `## Access

- **MCP server** (Pro plan and above): \`https://ai.realmarketapi.com/mcp?apiKey=YOUR_API_KEY\` (Streamable HTTP).
- **REST**: \`https://api.realmarketapi.com/api/v1/<route>\`, authenticated with the \`apiKey\` query parameter. Query parameters are camelCase (\`symbolCode\`, \`timeFrame\`, \`period\`, \`startTime\`, \`endTime\`, \`pageNumber\`, \`pageSize\`).
- **WebSocket** (Plus plan and above): \`wss://api.realmarketapi.com/<stream>?apiKey=YOUR_API_KEY&symbolCode=SYMBOL&timeFrame=TF\`.
- **Timeframes**: \`M1, M5, M15, H1, H4, D1\`. The Free plan covers 6 symbols on \`M1, M5, H1\`.
- **Plan gates**: indicators, insight and market-structure routes need Pro or above; volatility and history need Starter or above. Call \`GET /api/v1/me\` to see the plan, symbols, timeframes and remaining quota for a key.
- Never print, log or commit an API key. Read it from an environment variable or the client's secret store.
- Full schemas: <https://realmarketapi.com/.well-known/openapi.json>. Docs: <https://realmarketapi.com/en-US/docs>.`

const GUARDRAILS = `## Guardrails

- Fetch fresh data for every answer and quote the candle \`openTime\` (UTC) the numbers come from. Never invent or estimate a value the API did not return.
- If a call fails, read \`errors[].errorCode\` from the \`application/problem+json\` body, say what failed, and continue with what you have instead of guessing.
- RealMarketAPI provides market data and analytics only. It does not place orders, hold funds or supply news, fundamentals or order-book depth.
- Output is informational, not investment advice. State the invalidation level and the main risk with any directional view.`

const errors = []
const seen = new Set()
const all = []

for (const cat of categories) {
  for (const s of cat.skills) {
    const name = `realmarketapi-${s.slug}`
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name) || name.length > 64) errors.push(`bad name: ${name}`)
    if (seen.has(name)) errors.push(`duplicate: ${name}`)
    seen.add(name)
    if (s.desc.length > 1024) errors.push(`description too long: ${name}`)
    if (!/. Use /.test(s.desc)) errors.push(`description lacks a trigger: ${name}`)
    for (const t of s.tools) {
      if (t.startsWith("get_") && !MCP[t]) errors.push(`unknown MCP tool ${t} in ${name}`)
      if (!t.startsWith("get_") && !/^(GET|POST|DELETE|WSS) \//.test(t)) errors.push(`bad tool ${t} in ${name}`)
    }
    all.push({ ...s, name, category: cat.id, categoryTitle: cat.title, role: cat.role })
  }
}
if (errors.length) {
  console.error(errors.join("\n"))
  process.exit(1)
}

const list = (items) => items.map((i) => `- ${i}`).join("\n")

function dataSources(s) {
  const mcp = s.tools.filter((t) => t.startsWith("get_"))
  const rest = s.tools.filter((t) => !t.startsWith("get_"))
  const parts = []
  if (mcp.length) {
    parts.push(
      "| MCP tool | REST equivalent |\n|---|---|\n" +
        mcp.map((t) => `| \`${t}\` | \`GET /api/v1${MCP[t]}\` |`).join("\n"),
    )
  }
  if (rest.length) {
    parts.push(
      (mcp.length ? "REST and WebSocket only (no MCP tool):\n\n" : "") +
        list(
          rest.map((t) => {
            const [method, path] = t.split(" ")
            return method === "WSS" ? `\`wss://api.realmarketapi.com${path}\`` : `\`${method} /api/v1${path}\``
          }),
        ),
    )
  }
  if (!parts.length) parts.push("No API call of its own. This skill works on data and results gathered by other skills.")
  return parts.join("\n\n")
}

function render(s, extra = "") {
  return `---
name: ${s.name}
description: ${JSON.stringify(s.desc)}
license: MIT
metadata:
  author: RealMarketAPI
  version: "${VERSION}"
  category: ${s.category}
  role: ${JSON.stringify(s.role)}
---

# ${s.title}

${s.desc}

## Example requests

${list(s.prompts.map((p) => `"${p}"`))}

## Data sources

${dataSources(s)}

## Workflow

${s.steps.map((step, i) => `${i + 1}. ${step}`).join("\n")}

## Output

${list(s.out)}

## Avoid

${list(s.avoid)}
${extra}
${ACCESS}

${GUARDRAILS}
`
}

function index() {
  return categories
    .map(
      (c) =>
        `### ${c.title}\n\n${c.blurb}\n\n` +
        list(c.skills.map((s) => `\`realmarketapi-${s.slug}\`: ${s.desc.split(". Use ")[0]}.`)),
    )
    .join("\n\n")
}

rmSync(join(root, "skills"), { recursive: true, force: true })
for (const s of all) {
  const dir = join(root, "skills", s.name)
  mkdirSync(dir, { recursive: true })
  const extra = s.slug === "skills-catalog" ? `\n## Skill index\n\n${index()}\n` : ""
  writeFileSync(join(dir, "SKILL.md"), render(s, extra))
}

const table = categories
  .map((c) => `| [${c.title}](CATALOG.md#${c.id}) | ${c.role} | ${c.skills.length} | ${c.blurb} |`)
  .join("\n")

writeFileSync(
  join(root, "CATALOG.md"),
  `# Skill catalog\n\n${all.length} skills in ${categories.length} categories. Generated by \`scripts/build.mjs\`; edit \`catalog/\` instead of this file.\n\n` +
    categories
      .map(
        (c) =>
          `<a id="${c.id}"></a>\n\n## ${c.title}\n\n${c.blurb} Agent role: ${c.role}.\n\n| Skill | What it does |\n|---|---|\n` +
          c.skills
            .map((s) => `| [\`realmarketapi-${s.slug}\`](skills/realmarketapi-${s.slug}/SKILL.md) | ${s.desc.split(". Use ")[0]}. |`)
            .join("\n"),
      )
      .join("\n\n") +
    "\n",
)

writeFileSync(
  join(root, "skills.json"),
  JSON.stringify(
    {
      version: VERSION,
      repository: REPO,
      total: all.length,
      categories: categories.map((c) => ({
        id: c.id,
        title: c.title,
        role: c.role,
        description: c.blurb,
        skills: c.skills.map((s) => ({
          name: `realmarketapi-${s.slug}`,
          title: s.title,
          description: s.desc,
          tools: s.tools,
        })),
      })),
    },
    null,
    2,
  ) + "\n",
)

const readmePath = join(root, "README.md")
const readme = readFileSync(readmePath, "utf8")
  .replace(/<!-- table:start -->[\s\S]*<!-- table:end -->/, `<!-- table:start -->\n| Category | Agent role | Skills | Covers |\n|---|---|---|---|\n${table}\n<!-- table:end -->`)
  .replace(/<!-- count -->\d*<!-- \/count -->/g, `<!-- count -->${all.length}<!-- /count -->`)
writeFileSync(readmePath, readme)

console.log(`Built ${all.length} skills in ${categories.length} categories.`)
