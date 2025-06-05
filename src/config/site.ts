import { env } from "@/env"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "SSV Network Explorer",
  description:
    "Explore SSV Network | View key metrics, recent activity, and search for data.",
  url: env.NODE_ENV === "development" ? "http://localhost:3000" : env.SITE_URL,
  links: { github: "https://github.com/ssvlabs/ssv-explorer" },
}
