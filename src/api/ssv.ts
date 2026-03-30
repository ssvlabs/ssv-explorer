"use server"

import { unstable_cache } from "next/cache"
import { api } from "@/api/api-client"

interface CoinGeckoResponse {
  "ssv-network": {
    usd: number
    usd_24h_change: number
  }
}

export interface HerokuResponse {
  apr: number
  boost: number
  timestamp: string
  ssv: number
  eth: number
  operators: number
  validators: number
}

export interface SSVRates {
  price: number
  change: number | undefined
}

export const getSSVRates = async () => {
  return await unstable_cache(
    async (): Promise<SSVRates> => {
      return await api
        .get<CoinGeckoResponse>(
          "https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=ssv-network&include_24hr_change=true",
          {
            headers: {
              ...(process.env.COINGECKO_API_KEY && {
                "x-cg-demo-api-key": process.env.COINGECKO_API_KEY,
              }),
            },
          }
        )
        .then((data) => {
          return {
            price: data["ssv-network"].usd,
            change: data["ssv-network"].usd_24h_change,
          }
        })
        .catch(() => {
          // Fallback to Heroku API if any problem with CoinGecko API
          return api
            .get<HerokuResponse>(
              "https://ssv-price-8c98717db454.herokuapp.com/data"
            )
            .then((res) => ({
              price: res.ssv,
              change: undefined,
            }))
        })
    },
    ["ssv"],
    {
      revalidate: 30,
      tags: ["ssv"],
    }
  )()
}
