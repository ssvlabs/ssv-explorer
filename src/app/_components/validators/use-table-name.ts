import { useParams, usePathname } from "next/navigation"

export const useTableName = () => {
  const params = Object.values(useParams()).flat().filter(Boolean)
  const path = usePathname()
  const name = path.replace(new RegExp(params.join("|"), "g"), "")
  return `validators-table-${name}`
}
