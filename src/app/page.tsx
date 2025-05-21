import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Shell } from "@/components/shell"

export default async function Page() {
  return (
    <Shell className="gap-2">
      <div>
        Nothing to see here <b>Ravid</b>
      </div>
      <Button asChild className="w-fit" variant="secondary">
        <Link href="/operators" className="text-blue-500">
          Go to operators
        </Link>
      </Button>
    </Shell>
  )
}
