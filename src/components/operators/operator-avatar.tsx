import type { ComponentPropsWithoutRef } from "react"
import { forwardRef } from "react"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { MdOutlineLock } from "react-icons/md"

import { cn } from "@/lib/utils"

export const variants = cva("object-cover", {
  variants: {
    variant: {
      outline: "border border-gray-400 bg-gray-200",
      unstyled: "",
    },
    size: {
      base: "size-6 rounded-lg",
      lg: "size-8 rounded-lg",
      xl: "size-[68px] rounded-lg",
    },
  },
  defaultVariants: {
    size: "base",
    variant: "outline",
  },
})

export type OperatorAvatarProps = {
  src?: string
  isPrivate?: boolean
}

type FCProps = Omit<
  ComponentPropsWithoutRef<"div">,
  keyof OperatorAvatarProps
> &
  OperatorAvatarProps &
  VariantProps<typeof variants>

export const OperatorAvatar = forwardRef<HTMLDivElement, FCProps>(
  ({ src, className, isPrivate, size, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          variants({ size, variant, className }),
          "relative aspect-square select-none bg-cover bg-center"
        )}
        style={{
          backgroundImage: `url(${src || "/images/operator-avatar.svg"})`,
        }}
        {...props}
      >
        {isPrivate && (
          <div className="absolute right-0 top-1/2 w-fit rounded-sm bg-gray-50">
            <MdOutlineLock className="size-3 stroke-gray-50" />
          </div>
        )}
      </div>
    )
  }
)

OperatorAvatar.displayName = "OperatorAvatar"
