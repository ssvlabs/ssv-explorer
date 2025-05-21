import { unstable_cache } from "next/cache"
import { api } from "@/api/api-client"

export interface SSVRates {
  apr: number
  boost: number
  timestamp: string
  ssv: number
  eth: number
  operators: number
  validators: number
}
export const getSSVRates = async () =>
  await unstable_cache(
    async () => {
      return await api
        .get<SSVRates>("https://ssv-price-8c98717db454.herokuapp.com/data")
        .then((res) => ({
          ...res,
          staked_eth: res.validators * 32,
        }))
    },
    ["ssv"],
    {
      revalidate: 30,
      tags: ["ssv"],
    }
  )()
