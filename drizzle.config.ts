import { env } from "@/env.js"
import { type Config } from "drizzle-kit"

import { databasePrefix } from "@/lib/utils/constants"

export default {
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: [`${databasePrefix}_*`],
} satisfies Config
