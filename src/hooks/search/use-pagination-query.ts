import { useQueryStates } from "nuqs"

import { paginationParser } from "@/lib/search-parsers"

export const usePaginationQuery = () => {
  return useQueryStates(paginationParser)
}
