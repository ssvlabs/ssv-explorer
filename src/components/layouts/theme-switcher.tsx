"use client"

import { type FC } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

export const ThemeSwitcher: FC<ButtonProps> = ({ className, ...props }) => {
  const { resolvedTheme, setTheme } = useTheme()

  // resolvedTheme is undefined on first render for some reason thats why we use initial
  const initial =
    typeof window !== "undefined"
      ? window.document.documentElement.classList.contains("dark")
        ? "dark"
        : "light"
      : "light"

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const theme = resolvedTheme || initial

  const url = `/images/toggle/${theme}Mode.svg`

  return (
    <Button
      {...props}
      size="icon"
      className={cn(
        "size-fit rounded-full border-none bg-transparent transition-all",
        "hover:bg-transparent active:bg-transparent",
        {
          "hover:brightness-[1.15] active:brightness-[0.9]": theme === "dark",
          "hover:brightness-[1.05] active:brightness-[1]": theme === "light",
        },
        className
      )}
      onClick={toggleTheme}
    >
      <Image width="44" height="28" key={url} src={url} alt="theme-switcher" />
    </Button>
  )
}

ThemeSwitcher.displayName = "ThemeSwitcher"
