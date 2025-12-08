import { api } from "@/api/api-client"
import { type SSVRates } from "@/api/ssv"
import { useQuery } from "@tanstack/react-query"

export const useSSVRates = () => {
  return useQuery({
    queryKey: ["ssv"],
    refetchOnWindowFocus: false,
    queryFn: () => api.get<SSVRates>("/api/rates"),
  })
}
