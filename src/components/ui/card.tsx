import type { ComponentPropsWithRef, FC, ReactNode } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { isString } from "lodash-es"

import type { ComponentWithAs } from "@/types/component"
import { cn } from "@/lib/utils"
import { Text, textVariants } from "@/components/ui/text"

const variants = cva("rounded-2xl bg-gray-50 p-6", {
  variants: {
    variant: {
      default: "flex flex-col",
      disabled: "opacity-80",
      unstyled: "",
    },
    gap: {
      24: "gap-6",
      20: "gap-5",
      16: "gap-4",
      12: "gap-3",
      8: "gap-2",
      none: "",
    },
  },
  defaultVariants: {
    variant: "default",
    gap: 24,
  },
})

export interface CardProps extends VariantProps<typeof variants> {
  asChild?: boolean
}

type FCProps = FC<ComponentPropsWithRef<"div"> & CardProps>

export const Card: FCProps = ({
  className,
  asChild,
  variant,
  children,
  ...props
}) => {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      tabIndex={-1}
      className={cn(variants({ variant, className }), "outline-none")}
      {...props}
    >
      {children}
    </Comp>
  )
}

Card.displayName = "Card"

type CardHeaderProps = {
  title: ReactNode
  description?: ReactNode
}

type CardHeaderFC = ComponentWithAs<"div", CardHeaderProps>
export const CardHeader: CardHeaderFC = ({
  as,
  title,
  description,
  className,
  ...props
}) => {
  const Comp = as ?? "div"
  const isTitleString = isString(title)
  const isDescriptionString = isString(description)

  return (
    <Comp className={cn("flex flex-col gap-4", className)} {...props}>
      {isTitleString ? (
        <Text variant="headline4">{title}</Text>
      ) : (
        <Slot className={textVariants({ variant: "headline4" })}>{title}</Slot>
      )}

      {description &&
        (isDescriptionString ? (
          <Text variant="body-2-medium">{description}</Text>
        ) : (
          <Slot className={textVariants({ variant: "body-2-medium" })}>
            {description}
          </Slot>
        ))}
    </Comp>
  )
}
