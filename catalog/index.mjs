import foundations from "./01-foundations.mjs"
import marketData from "./02-market-data.mjs"
import technical from "./03-technical.mjs"
import risk from "./04-risk.mjs"
import structure from "./05-structure.mjs"
import signals from "./06-signals.mjs"
import strategies from "./07-strategies.mjs"
import assets from "./08-assets.mjs"
import { sessions, quant } from "./09-sessions-quant.mjs"
import { screening, alerts, reporting } from "./10-ops-reporting.mjs"
import { developer, teams } from "./11-dev-teams.mjs"

/** Category order is the order used in CATALOG.md, README and skills.json. */
export const categories = [
  foundations,
  marketData,
  technical,
  risk,
  structure,
  signals,
  strategies,
  assets,
  sessions,
  quant,
  screening,
  alerts,
  reporting,
  developer,
  teams,
]
