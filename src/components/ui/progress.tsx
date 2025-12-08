"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/index"

export const progressVariants = cva("", {
  variants: {
    colorScheme: {
      primary: "bg-primary-50 [&>.progress-bar]:bg-primary-500",
      success: "bg-mintaloe-light/20 [&>.progress-bar]:bg-mintaloe-light",
      violeta: "bg-violeta-light/20 [&>.progress-bar]:bg-violeta-light",
    },
  },

  defaultVariants: {
    colorScheme: "primary",
  },
})

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, colorScheme, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={progressVariants({
      colorScheme,
      className: cn(
        "relative h-2.5 w-full overflow-hidden rounded-[2px]",
        className
      ),
    })}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "progress-bar size-full flex-1 rounded-[2px] transition-all"
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
