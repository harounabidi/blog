import type { Config } from "drizzle-kit"

const config: Config = {
  schema: "./schemas/drizzle.ts",
  dialect: "sqlite",
  out: "./output",
  dbCredentials: {
    url: "./.wrangler/state/v3/d1/miniflare-D1DatabaseObject/9c5b3b10c17b282523a0bc2f9c445b75f9033067f72efcf847a2b5272f9aa14e.sqlite",
  },
  tablesFilter: ["!_cf_KV"],
}

export default config satisfies Config
