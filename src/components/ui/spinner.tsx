import type { ComponentPropsWithoutRef, FC } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import type { Loader2 } from "lucide-react"
import { CgSpinner } from "react-icons/cg"

import { cn } from "@/lib/utils"

export const spinnerVariants = cva("animate-spin text-primary-500", {
  variants: {
    size: {
      default: "size-6",
      sm: "size-4",
      lg: "size-8",
    },
  },

  defaultVariants: {
    size: "default",
  },
})

export const Spinner: FC<
  ComponentPropsWithoutRef<typeof Loader2> &
    VariantProps<typeof spinnerVariants>
> = ({ className, size, ...props }) => {
  return (
    <CgSpinner
      className={cn(
        spinnerVariants({
          className,
          size,
        })
      )}
      {...props}
    />
  )
}

Spinner.displayName = "Spinner"
