"use client"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { NuqsAdapter } from "nuqs/adapters/next/app"

import { TooltipProvider } from "@/components/ui/tooltip"

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <NuqsAdapter> {children}</NuqsAdapter>
        </TooltipProvider>
      </NextThemesProvider>
    </QueryClientProvider>
  )
}
