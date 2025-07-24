import type { ComponentPropsWithRef, FC } from "react"

import { cn } from "@/lib/utils"

export type StatusIndicatorProps = {
  status: "active" | "offline" | "no-validators"
}

type StatusIndicatorFC = FC<
  Omit<ComponentPropsWithRef<"svg">, keyof StatusIndicatorProps> &
    StatusIndicatorProps
>

export const StatusIndicator: StatusIndicatorFC = ({
  className,
  status,
  ...props
}) => {
  if (status === "active") {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(className)}
        {...props}
      >
        <rect x="4" y="4" width="16" height="16" rx="8" fill="var(--gray-50)" />
        <rect
          x="6"
          y="6"
          width="12"
          height="12"
          rx="6"
          fill="var(--success-500)"
          fillOpacity="0.16"
        />
        <rect
          x="7"
          y="7"
          width="10"
          height="10"
          rx="5"
          fill="var(--success-500)"
        />
        <rect
          opacity="0.32"
          x="13"
          y="11"
          width="3"
          height="3"
          rx="1.5"
          fill="var(--gray-50)"
          fillOpacity="0.32"
        />
        <rect
          opacity="0.32"
          x="8"
          y="11"
          width="3"
          height="3"
          rx="1.5"
          fill="var(--gray-50)"
          fillOpacity="0.32"
        />
        <path
          opacity="0.32"
          d="M13 15.6987V15.6987C12.3705 16.0135 11.6295 16.0135 11 15.6987V15.6987"
          stroke="var(--gray-50)"
          strokeOpacity="0.32"
          strokeWidth="0.8"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  if (status === "offline") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className={cn(className)}
        {...props}
      >
        <rect x="4" y="4" width="16" height="16" rx="8" fill="var(--gray-50)" />
        <rect
          x="6"
          y="6"
          width="12"
          height="12"
          rx="6"
          fill="var(--error-500)"
          fillOpacity="0.2"
        />
        <rect
          opacity="0.72"
          x="7"
          y="7"
          width="10"
          height="10"
          rx="5"
          fill="var(--error-500)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 7C9.23858 7 7 9.23858 7 12C7 13.1508 7.38876 14.2107 8.04212 15.0557L8.30479 14.6008L8.99761 15.0008L8.6088 15.6742C8.78215 15.8343 8.96686 15.9823 9.16158 16.1168L9.60382 15.3508L10.2966 15.7508L9.85407 16.5174C10.0661 16.6183 10.2863 16.7047 10.5134 16.7753L10.9029 16.1008L11.5957 16.5008L11.3329 16.9559C11.5512 16.985 11.7738 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7ZM10.3352 9.88407C9.61773 9.46986 8.70034 9.71567 8.28613 10.4331C7.87192 11.1506 8.11773 12.0679 8.83517 12.4822C9.55261 12.8964 10.47 12.6506 10.8842 11.9331C11.2984 11.2157 11.0526 10.2983 10.3352 9.88407ZM14.6653 12.3841C13.9479 11.9699 13.0305 12.2157 12.6163 12.9331C12.202 13.6506 12.4479 14.5679 13.1653 14.9821C13.8827 15.3964 14.8001 15.1506 15.2143 14.4331C15.6285 13.7157 15.3827 12.7983 14.6653 12.3841ZM10.8967 13.3458C11.1101 13.2886 11.3294 13.4152 11.3866 13.6286L11.6731 14.698L10.9004 14.9051L10.7174 14.222L10.0344 14.4051L9.82732 13.6323L10.8967 13.3458Z"
          fill="var(--error-500)"
        />
      </svg>
    )
  }
  return null
}

StatusIndicator.displayName = "StatusIndicator"
