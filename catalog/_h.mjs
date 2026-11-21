/**
 * One skill. `desc` must read "<what it does>. Use when <trigger>."
 * `tools` holds MCP tool names ("get_rsi") or REST/WebSocket routes relative
 * to /api/v1 ("GET /price/24hr", "POST /alerts", "WSS /price").
 */
export const sk = (slug, title, desc, tools, steps, out, avoid, prompts) => ({
  slug,
  title,
  desc,
  tools,
  steps,
  out,
  avoid,
  prompts,
})
