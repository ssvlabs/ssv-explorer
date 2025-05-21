/* eslint-disable @next/next/no-img-element */
import { type ComponentProps, type FC } from "react"

export const Logo: FC<ComponentProps<"img">> = (props) => {
  return (
    <>
      <img
        src="/images/logo.svg"
        alt="Logo"
        className="dark:hidden"
        {...props}
      />
      <img
        src="/images/logo-dark.svg"
        alt="Logo"
        className="hidden dark:block"
        {...props}
      />
    </>
  )
}
