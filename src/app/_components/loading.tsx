import { Spinner } from "@/components/ui/spinner"
import { Shell } from "@/components/shell"

export default async function Page() {
  return (
    <Shell className="flex size-full flex-1 items-center justify-center gap-2">
      <Spinner />
    </Shell>
  )
}
