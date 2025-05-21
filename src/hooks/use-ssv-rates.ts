import { type SSVRates } from "@/api/ssv"
import { useQuery } from "@tanstack/react-query"

export const useSSVRates = () => {
  return useQuery({
    queryKey: ["ssv"],
    queryFn: () =>
      fetch("/api/rates").then((res) => res.json()) as Promise<SSVRates>,
  })
}
