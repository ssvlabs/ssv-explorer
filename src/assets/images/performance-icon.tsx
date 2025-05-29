import { ComponentPropsWithoutRef, FC } from "react"

import { cn } from "@/lib/utils"

export interface PerformanceIconProps extends ComponentPropsWithoutRef<"svg"> {
  /**
   * Custom color for the icon. Uses gray-800 by default.
   */
  color?: string
}

export const PerformanceIcon: FC<PerformanceIconProps> = ({
  className,
  color = "var(--gray-800)",
  ...props
}) => {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      {...props}
    >
      <path
        d="M3.16669 9.33333L6.34733 5.86354C6.63769 5.54678 7.09795 5.45093 7.49062 5.62545L9.20575 6.38773C9.58386 6.55578 10.0264 6.47361 10.319 6.18103L13.5 3"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="square"
      />
      <path
        d="M11.8333 2.66699H13.8333V4.66699"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="square"
      />
      <path
        opacity="0.4"
        d="M4.49999 12.666V11.3327"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M7.16665 12.666V8.66602"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M9.83333 12.666V9.33268"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M12.5 12.666V7.33268"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  )
}

PerformanceIcon.displayName = "PerformanceIcon"
